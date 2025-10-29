import React, { useState } from "react";
import { PlusCircle, Search, Globe } from "lucide-react";

export default function App() {
  const [language, setLanguage] = useState("en");
  const [filters, setFilters] = useState({ location: "", sort: "", supermarket: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [discounts, setDiscounts] = useState([
    {
      id: 1,
      date: "2025-10-15",
      location: "Berlin",
      supermarket: "REWE",
      sort: "Vegetable",
      name: "Tomatoes -50%",
      photo: "",
    },
    {
      id: 2,
      date: "2025-10-16",
      location: "Berlin",
      supermarket: "Lidl",
      sort: "Fruit",
      name: "Apples Buy 1 Get 1",
      photo: "",
    },
    {
      id: 3,
      date: "2025-10-17",
      location: "Berlin",
      supermarket: "Aldi",
      sort: "Meat",
      name: "Chicken Breast 30% Off",
      photo: "",
    },
  ]);

  const [newDiscount, setNewDiscount] = useState({
    date: "",
    location: "",
    supermarket: "",
    sort: "",
    name: "",
    photo: "",
  });
  const [showModal, setShowModal] = useState(false);

  const filteredDiscounts = discounts.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.location === "" || d.location === filters.location) &&
      (filters.sort === "" || d.sort === filters.sort) &&
      (filters.supermarket === "" || d.supermarket === filters.supermarket)
  );

  const handleAddDiscount = () => {
    if (!newDiscount.name) return;
    setDiscounts([
      ...discounts,
      { id: discounts.length + 1, ...newDiscount },
    ]);
    setShowModal(false);
    setNewDiscount({
      date: "",
      location: "",
      supermarket: "",
      sort: "",
      name: "",
      photo: "",
    });
  };

  const t = (en, zh) => (language === "en" ? en : zh);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Discount-Sharing-Platform</h1>
        <button
          className="flex items-center gap-2 bg-white px-3 py-1 rounded-xl shadow hover:bg-gray-100"
          onClick={() => setLanguage(language === "en" ? "zh" : "en")}
        >
          <Globe className="w-4 h-4" />
          {language === "en" ? "中文" : "English"}
        </button>
      </header>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={t("Search discounts...", "搜索折扣信息...")}
            className="w-full pl-10 pr-3 py-2 border rounded-xl shadow-sm focus:outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="p-2 border rounded-xl"
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        >
          <option value="">{t("All Locations", "全部地点")}</option>
          <option>Berlin</option>
        </select>
        <select
          className="p-2 border rounded-xl"
          onChange={(e) => setFilters({ ...filters, supermarket: e.target.value })}
        >
          <option value="">{t("All Supermarkets", "全部超市")}</option>
          <option>REWE</option>
          <option>Lidl</option>
          <option>Aldi</option>
        </select>
        <select
          className="p-2 border rounded-xl"
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
        >
          <option value="">{t("All Categories", "全部分类")}</option>
          <option>Vegetable</option>
          <option>Fruit</option>
          <option>Meat</option>
        </select>
        <button
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-600"
          onClick={() => setShowModal(true)}
        >
          <PlusCircle className="w-4 h-4" /> {t("Add Discount", "添加折扣")}
        </button>
      </div>

      <table className="w-full bg-white rounded-2xl shadow overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">No.</th>
            <th className="p-3 text-left">{t("Date", "日期")}</th>
            <th className="p-3 text-left">{t("Location", "地点")}</th>
            <th className="p-3 text-left">{t("Supermarket", "超市")}</th>
            <th className="p-3 text-left">{t("Sort", "分类")}</th>
            <th className="p-3 text-left">{t("Name", "名称")}</th>
            <th className="p-3 text-left">{t("Photo", "照片")}</th>
          </tr>
        </thead>
        <tbody>
          {filteredDiscounts.map((d) => (
            <tr key={d.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{d.id}</td>
              <td className="p-3">{d.date}</td>
              <td className="p-3">{d.location}</td>
              <td className="p-3">{d.supermarket}</td>
              <td className="p-3">{d.sort}</td>
              <td className="p-3 font-medium">{d.name}</td>
              <td className="p-3">
                {d.photo ? (
                  <img src={d.photo} alt="discount" className="w-16 h-16 object-cover rounded-lg" />
                ) : (
                  "—"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">{t("Add Discount", "添加折扣")}</h2>
            <input
              type="date"
              className="w-full mb-2 p-2 border rounded-xl"
              value={newDiscount.date}
              onChange={(e) => setNewDiscount({ ...newDiscount, date: e.target.value })}
            />
            <input
              type="text"
              placeholder={t("Location", "地点")}
              className="w-full mb-2 p-2 border rounded-xl"
              value={newDiscount.location}
              onChange={(e) => setNewDiscount({ ...newDiscount, location: e.target.value })}
            />
            <input
              type="text"
              placeholder={t("Supermarket", "超市")}
              className="w-full mb-2 p-2 border rounded-xl"
              value={newDiscount.supermarket}
              onChange={(e) => setNewDiscount({ ...newDiscount, supermarket: e.target.value })}
            />
            <input
              type="text"
              placeholder={t("Category", "分类")}
              className="w-full mb-2 p-2 border rounded-xl"
              value={newDiscount.sort}
              onChange={(e) => setNewDiscount({ ...newDiscount, sort: e.target.value })}
            />
            <input
              type="text"
              placeholder={t("Discount Name", "折扣名称")}
              className="w-full mb-2 p-2 border rounded-xl"
              value={newDiscount.name}
              onChange={(e) => setNewDiscount({ ...newDiscount, name: e.target.value })}
            />
            <input
              type="file"
              accept="image/*"
              className="mb-2"
              onChange={(e) =>
                setNewDiscount({
                  ...newDiscount,
                  photo: URL.createObjectURL(e.target.files[0]),
                })
              }
            />
            {newDiscount.photo && (
              <img src={newDiscount.photo} alt="preview" className="w-24 h-24 object-cover rounded-xl mb-2" />
            )}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-xl"
              >
                {t("Cancel", "取消")}
              </button>
              <button
                onClick={handleAddDiscount}
                className="px-4 py-2 bg-blue-500 text-white rounded-xl"
              >
                {t("Add", "添加")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}