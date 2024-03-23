import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

export default function EmailTemplates() {
  const [templates, setTemplates] = useState([]);

  async function fetchTemplates() {
    await fetch("/api/v1/ticket/templates", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("session")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log(data.templates);
          setTemplates(data.templates);
        }
      });
  }

  useEffect(() => {
    fetchTemplates();
  }, []);

  return (
    <div>
      <h1>Email Templates</h1>
      <table>
        <tbody>
          {templates.map((template) => (
            <tr key={template.id}>
              <td>{template.type}</td>
              <td>{template.subject}</td>
              <td>{template.html}</td>
              <td>
                <a href={`/admin/email/templates/${template.id}`}>Edit</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
