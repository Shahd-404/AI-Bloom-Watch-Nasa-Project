import React, { useState } from "react";
import Button from "../../components/ui/Button";
import { Card, CardContent } from "../../components/ui/Card";

export default function UploadsPanel() {
  const [files, setFiles] = useState<File[]>([]);
  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.files ? Array.from(e.target.files) : [];
    setFiles((prev) => [...prev, ...next]);
  };

  return (
    <section>
      <h2 className="text-2xl font-bold">Uploads</h2>
      <p className="mt-1 text-slate-600">ارفع ملفاتك (CSV/Images/Docs) للمعالجة.</p>

      <Card className="mt-6">
        <CardContent>
          <label
            htmlFor="upl"
            className="block cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 bg-white p-8 text-center hover:bg-slate-50"
          >
            <div className="text-slate-600">اسحب وأفلت الملفات هنا أو اضغط للاختيار</div>
            <input id="upl" type="file" multiple className="hidden" onChange={onPick} />
          </label>

          {files.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold">الملفات المختارة</h3>
              <ul className="mt-2 space-y-2 text-sm">
                {files.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2"
                  >
                    <span className="truncate mr-2">{f.name}</span>
                    <span className="text-slate-500">{(f.size / 1024).toFixed(1)} KB</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex gap-2">
                <Button rounded="xl">رفع</Button>
                <Button variant="outline" rounded="xl" onClick={() => setFiles([])}>
                  مسح
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
