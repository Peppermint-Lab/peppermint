import { notifications } from "@mantine/notifications";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/themes/prism.css";
import { useEffect, useState } from "react";
import Editor from "react-simple-code-editor";

export default function EmailTemplates() {
  const [template, setTemplate] = useState<any>();

  const router = useRouter();

  const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`);

  async function fetchTemplate() {
    await fetch(`/api/v1/ticket/template/${router.query.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("session")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log(data);
          setTemplate(data.template[0].html);
        }
      });
  }

  async function updateTemplate() {
    await fetch(`/api/v1/ticket/template/${router.query.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("session")}`,
      },
      body: JSON.stringify({ html: template }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          notifications.show({
            title: "Success",
            message: `Template updated`,
            color: "Green",
            autoClose: 5000,
          });
        }
      });
  }

  useEffect(() => {
    fetchTemplate();
  }, []);

  return (
    <div>
      <div>
        <button
          type="button"
          onClick={updateTemplate}
          className="rounded-md bg-green-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        >
          Update Template
        </button>
      </div>
      <div className="flex flex-row">
        <div className="w-1/2 overflow-scroll">
          {template !== undefined && (
            <Editor
              value={template}
              onValueChange={(code) => setTemplate(code)}
              highlight={(code) => highlight(code, languages.js, "html")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                overflow: "scroll",
              }}
              textareaClassName="overflow-scroll"
            />
          )}
        </div>
        <div className="w-1/2">
          <span>
            <div dangerouslySetInnerHTML={{ __html: template }} />
          </span>
        </div>
      </div>
    </div>
  );
}
