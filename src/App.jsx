import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const egyptCities = [
    { en: "Cairo", ar: "القاهرة" },
    { en: "Alexandria", ar: "الإسكندرية" },
    { en: "Giza", ar: "الجيزة" },
    { en: "Port Said", ar: "بورسعيد" },
    { en: "Suez", ar: "السويس" },
    { en: "Mansoura", ar: "المنصورة" },
    { en: "Zagazig", ar: "الزقازيق" },
    { en: "Asyut", ar: "أسيوط" },
    { en: "Aswan", ar: "أسوان" },
    { en: "Luxor", ar: "الأقصر" },
    { en: "Faiyum", ar: "الفيوم" },
    { en: "Tanta", ar: "طنطا" },
    { en: "Damietta", ar: "دمياط" },
    { en: "Minya", ar: "المنيا" },
    { en: "Beni Suef", ar: "بني سويف" },
    { en: "Qena", ar: "قنا" },
    { en: "Kafr El Sheikh", ar: "كفر الشيخ" },
    { en: "Damanhur", ar: "دمنهور" },
    { en: "Arish", ar: "العريش" },
    { en: "Marsa Matruh", ar: "مرسى مطروح" },
    { en: "Ismailia", ar: "الإسماعيلية" },
    { en: "Shibin El Kom", ar: "شبين الكوم" },
    { en: "Banha", ar: "بنها" },
    { en: "Hurghada", ar: "الغردقة" },
    { en: "6th of October", ar: "6 أكتوبر" },
    { en: "Obour", ar: "العبور" },
    { en: "Sohag", ar: "سوهاج" },
  ];
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const [city, setCity] = useState("Cairo");
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [loading, setLoading] = useState(true);

  function convertTo12Hour(time24) {
    const [hourStr, minute] = time24.split(":");
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
  }

  async function getPrayerTimes(selectedCity) {
    setLoading(true);
    try {
      const options = {
        url: `https://api.aladhan.com/v1/timingsByCity?city=${selectedCity}&country=Egypt&method=5`,
        method: "GET",
      };
      const { data } = await axios.request(options);
      setPrayerTimes(data.data);
    } catch (error) {
      console.error("فشل في جلب مواقيت الصلاة", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPrayerTimes(city);
  }, [city]);

  return (
    <>
      <section className="main-bg h-[100vh]">
        <div className="container m-auto relative  h-full flex  flex-col justify-center items-center ">
          <div className="text-center absolute top-10 p-4 rounded-2xl  backdrop-blur-xs backdrop-brightness-75 w-full md:w-1/2 lg:w-[45%] xl:w-[30%] ">
            <h1 className="text-3xl text-white font-bold "> مواقيت الصلاة</h1>
          </div>
          <div className=" w-full md:w-1/2 lg:w-[45%] xl:w-[30%] mx-4 rounded-2xl overflow-hidden p-8 backdrop-blur-xs backdrop-brightness-75 tracking-widest">
            {prayerTimes ? (
              <>
                <div className="header flex justify-between items-center border-b border-gray-500 pb-6 ">
                  <div className="flex flex-col  items-end text-xl md:text-2xl text-white font-bold  gap-3 ">
                    <h2 className="">التاريخ</h2>
                    {prayerTimes && (
                      <p className=" md:text-xl">
                        {prayerTimes.date.gregorian.date}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col  items-end text-xl md:text-2xl text-white font-bold  gap-3">
                    <h2 className=" pr-2">المدينه </h2>
                    <div className="relative">
                      <select
                        onChange={(e) => {
                          setCity(e.target.value);
                        }}
                        dir="rtl"
                        className="bg-amber-900 appearance-none  cursor-pointer  px-4 md:px-8    font-semibold text-lg md:text-xl py-1 rounded-xl focus:outline-none"
                      >
                        {egyptCities.map((city, index) => (
                          <option key={index} value={city.en}>
                            {city.ar}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 -left-1 flex items-center px-2 text-white">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                {prayerTimes && loading ? (
                  <div className="min-h-[300px] flex justify-center items-center">
                    <span className="loader text-white text-xl"></span>
                  </div>
                ) : (
                  <>
                    <div className="body py-5 space-y-4">
                      {[
                        { key: "Fajr", label: "الفجر" },
                        { key: "Dhuhr", label: "الظهر" },
                        { key: "Asr", label: "العصر" },
                        { key: "Maghrib", label: "المغرب" },
                        { key: "Isha", label: "العشاء" },
                      ].map((item, i) => (
                        <motion.div
                          key={item.key}
                          className="flex justify-between items-center text-lg md:text-xl font-bold text-white bg-amber-900 px-4 py-2 rounded-xl"
                          custom={i}
                          initial="hidden"
                          animate="visible"
                          variants={itemVariants}
                        >
                          <p className="text-md md:text-lg">
                            {convertTo12Hour(prayerTimes.timings[item.key])}
                          </p>
                          <h3>: {item.label}</h3>
                        </motion.div>
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="min-h-[400px] flex justify-center items-center">
                <span className="loader"></span>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
