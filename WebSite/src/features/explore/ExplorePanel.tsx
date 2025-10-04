import React from "react";
import Button from "../../components/ui/Button";
import { Card, CardContent } from "../../components/ui/Card";

export default function ExplorePanel() {
  return (
    <section>
      <h2 className="text-2xl font-bold">Explore</h2>
      <p className="mt-1 text-slate-600">ابحث، رشّح، واستعرض المحتوى.</p>

      <div className="mt-6 grid md:grid-cols-[1fr,240px] gap-4">
        <Card>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="ابحث عن أي شيء…"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-4 ring-slate-200"
                />
              </div>
              <Button rounded="xl">بحث</Button>
            </div>

            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={`https://picsum.photos/seed/ex${i}/640/360`}
                    alt="item"
                    className="w-full h-36 object-cover"
                  />
                  <CardContent>
                    <h3 className="font-semibold">نتيجة رقم {i + 1}</h3>
                    <p className="text-sm text-slate-600">وصف مختصر لعنصر الاستكشاف.</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="font-semibold">فلاتر</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Recent", "Popular", "A–Z", "Z–A"].map((f) => (
                <button
                  key={f}
                  className="px-3 py-1.5 rounded-full text-sm border border-slate-200 hover:bg-slate-100"
                >
                  {f}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
