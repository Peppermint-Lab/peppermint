const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const buildDir = path.join(root, ".pptx-build-db");
const outFile = path.join(root, "PROJECT_DATABASE_SCHEMA_PRESENTATION.pptx");

const slides = [
  {
    title: "Peppermint Database & Project Flow",
    bullets: [
      "Peppermint is a helpdesk / ticket management system.",
      "The database is centered around Tickets.",
      "Users manage tickets for Clients.",
      "Comments, files, time tracking, notifications, emails, webhooks, roles, and config support the ticket workflow.",
    ],
  },
  {
    title: "Most Important Files",
    bullets: [
      "DB schema: apps/api/src/prisma/schema.prisma",
      "Prisma client: apps/api/src/prisma.ts",
      "Seed data: apps/api/src/prisma/seed.js",
      "Migrations: apps/api/src/prisma/migrations",
      "Routes: apps/api/src/routes.ts",
      "Backend controllers: apps/api/src/controllers",
      "Frontend pages/components: apps/client/pages and apps/client/components",
    ],
  },
  {
    title: "Architecture",
    bullets: [
      "Frontend: Next.js app inside apps/client.",
      "Frontend calls backend endpoints like /api/v1/ticket/create.",
      "Backend: Fastify API inside apps/api.",
      "Controllers use Prisma to read and write database data.",
      "Database: PostgreSQL, configured through DATABASE_URL.",
    ],
  },
  {
    title: "User vs Client",
    bullets: [
      "Client is not a User.",
      "User is a login account: admin, support agent, staff, or external account.",
      "Client is customer/contact data.",
      "A Client cannot log in with the current schema.",
      "If an external person logs in, they are stored as User with external_user, not as Client.",
    ],
  },
  {
    title: "Core Models",
    bullets: [
      "User: app account and login identity.",
      "Client: customer/contact record.",
      "Ticket: main work item.",
      "Comment: ticket conversation.",
      "TicketFile: ticket attachments.",
      "TimeTracking: time spent on tickets or clients.",
      "Role and Session: permissions and authentication state.",
    ],
  },
  {
    title: "Ticket Model",
    bullets: [
      "Ticket is the center of the project.",
      "Important fields: title, detail, email, priority, status, type, isComplete, fromImap, Number, hidden, locked.",
      "RevFlow/custom fields: custom_field_1, custom_field_2, custom_field_3, outcome, customer_field.",
      "Relations: assigned user, client, team, comments, files, time tracking, notifications, knowledge base.",
    ],
  },
  {
    title: "Ticket Status & Type",
    bullets: [
      "Statuses: hold, needs_support, in_progress, in_review, done.",
      "Typical flow: needs_support -> in_progress -> in_review -> done.",
      "Types: bug, feature, support, incident, service, maintenance, access, feedback, revflow.",
      "This means the app handles more than basic support tickets.",
    ],
  },
  {
    title: "Main Ticket Flow",
    bullets: [
      "1. User logs in.",
      "2. Frontend loads dashboard and tickets.",
      "3. User creates or updates a ticket.",
      "4. Backend stores Ticket data through Prisma.",
      "5. Ticket can be assigned to User and linked to Client.",
      "6. Comments, files, time entries, and notifications are added.",
      "7. Emails or webhooks may be triggered.",
    ],
  },
  {
    title: "Email & Incoming Queues",
    bullets: [
      "Email stores outgoing SMTP/OAuth mail config.",
      "emailTemplate stores ticket email templates.",
      "EmailQueue stores incoming mailbox / IMAP settings.",
      "Imap_Email stores raw incoming email data.",
      "IMAP service can create tickets or comments from received emails.",
    ],
  },
  {
    title: "Config, Roles & Notifications",
    bullets: [
      "Config controls app-wide settings like SSO, roles_active, feature_previews, encryption_key, and first_time_setup.",
      "Role stores permission groups. Permissions are stored as JSON.",
      "Session stores login sessions and API keys.",
      "notifications stores in-app alerts connected to users and optionally tickets.",
    ],
  },
  {
    title: "Module Map",
    bullets: [
      "Tickets: apps/api/src/controllers/ticket.ts and apps/client/components/TicketDetails/index.tsx",
      "Users: apps/api/src/controllers/users.ts",
      "Clients: apps/api/src/controllers/clients.ts",
      "Roles: apps/api/src/controllers/roles.ts",
      "Email/config: apps/api/src/controllers/config.ts",
      "Queues: apps/api/src/controllers/queue.ts and apps/api/src/lib/services/imap.service.ts",
      "Storage: apps/api/src/controllers/storage.ts",
    ],
  },
  {
    title: "Final Mental Model",
    bullets: [
      "User = login account.",
      "Client = customer/contact record, not a login account.",
      "Ticket = central work item.",
      "Ticket connects User, Client, Comments, Files, TimeTracking, and Notifications.",
      "Email, queues, webhooks, roles, auth providers, and config support the ticket system.",
    ],
  },
];

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function write(filePath, content) {
  ensureDir(filePath);
  fs.writeFileSync(filePath, content);
}

function textShape(id, name, x, y, cx, cy, fontSize, color, text, bold = false) {
  return `
    <p:sp>
      <p:nvSpPr>
        <p:cNvPr id="${id}" name="${esc(name)}"/>
        <p:cNvSpPr/>
        <p:nvPr/>
      </p:nvSpPr>
      <p:spPr>
        <a:xfrm>
          <a:off x="${x}" y="${y}"/>
          <a:ext cx="${cx}" cy="${cy}"/>
        </a:xfrm>
        <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
        <a:noFill/>
        <a:ln><a:noFill/></a:ln>
      </p:spPr>
      <p:txBody>
        <a:bodyPr wrap="square"/>
        <a:lstStyle/>
        <a:p>
          <a:r>
            <a:rPr lang="en-US" sz="${fontSize}"${bold ? ' b="1"' : ""}>
              <a:solidFill><a:srgbClr val="${color}"/></a:solidFill>
            </a:rPr>
            <a:t>${esc(text)}</a:t>
          </a:r>
        </a:p>
      </p:txBody>
    </p:sp>`;
}

function bulletShape(id, y, text) {
  return `
    <p:sp>
      <p:nvSpPr>
        <p:cNvPr id="${id}" name="Bullet ${id}"/>
        <p:cNvSpPr/>
        <p:nvPr/>
      </p:nvSpPr>
      <p:spPr>
        <a:xfrm>
          <a:off x="720000" y="${y}"/>
          <a:ext cx="7800000" cy="430000"/>
        </a:xfrm>
        <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
        <a:noFill/>
        <a:ln><a:noFill/></a:ln>
      </p:spPr>
      <p:txBody>
        <a:bodyPr wrap="square"/>
        <a:lstStyle/>
        <a:p>
          <a:pPr marL="320000" indent="-180000">
            <a:buChar char="•"/>
          </a:pPr>
          <a:r>
            <a:rPr lang="en-US" sz="1850">
              <a:solidFill><a:srgbClr val="263238"/></a:solidFill>
            </a:rPr>
            <a:t>${esc(text)}</a:t>
          </a:r>
        </a:p>
      </p:txBody>
    </p:sp>`;
}

function slideXml(slide, index) {
  const bullets = slide.bullets
    .slice(0, 8)
    .map((bullet, i) => bulletShape(10 + i, 1500000 + i * 560000, bullet))
    .join("");

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"
       xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
       xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld>
    <p:bg>
      <p:bgPr>
        <a:solidFill><a:srgbClr val="F8FAFC"/></a:solidFill>
        <a:effectLst/>
      </p:bgPr>
    </p:bg>
    <p:spTree>
      <p:nvGrpSpPr>
        <p:cNvPr id="1" name=""/>
        <p:cNvGrpSpPr/>
        <p:nvPr/>
      </p:nvGrpSpPr>
      <p:grpSpPr>
        <a:xfrm>
          <a:off x="0" y="0"/>
          <a:ext cx="0" cy="0"/>
          <a:chOff x="0" y="0"/>
          <a:chExt cx="0" cy="0"/>
        </a:xfrm>
      </p:grpSpPr>
      ${textShape(2, "Title", 520000, 420000, 8200000, 560000, 3050, "0F172A", slide.title, true)}
      ${textShape(3, "Slide number", 8420000, 6500000, 600000, 240000, 1100, "64748B", `${index + 1}/${slides.length}`)}
      ${bullets}
    </p:spTree>
  </p:cSld>
  <p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>
</p:sld>`;
}

function relsXml(count) {
  const rels = Array.from({ length: count }, (_, i) => {
    const id = i + 1;
    return `<Relationship Id="rId${id}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide${id}.xml"/>`;
  }).join("");
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${rels}</Relationships>`;
}

function presentationXml(count) {
  const slideIds = Array.from({ length: count }, (_, i) => {
    const id = i + 1;
    return `<p:sldId id="${255 + id}" r:id="rId${id}"/>`;
  }).join("");
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:presentation xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"
                xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
                xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:sldIdLst>${slideIds}</p:sldIdLst>
  <p:sldSz cx="9144000" cy="6858000" type="screen4x3"/>
  <p:notesSz cx="6858000" cy="9144000"/>
</p:presentation>`;
}

function contentTypes(count) {
  const slidesOverride = Array.from({ length: count }, (_, i) => {
    const id = i + 1;
    return `<Override PartName="/ppt/slides/slide${id}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>`;
  }).join("");
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
  ${slidesOverride}
</Types>`;
}

function build() {
  fs.rmSync(buildDir, { recursive: true, force: true });
  fs.rmSync(outFile, { force: true });

  write(path.join(buildDir, "[Content_Types].xml"), contentTypes(slides.length));
  write(path.join(buildDir, "_rels/.rels"), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>`);
  write(path.join(buildDir, "ppt/presentation.xml"), presentationXml(slides.length));
  write(path.join(buildDir, "ppt/_rels/presentation.xml.rels"), relsXml(slides.length));
  write(path.join(buildDir, "docProps/core.xml"), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:dcterms="http://purl.org/dc/terms/"
  xmlns:dcmitype="http://purl.org/dc/dcmitype/"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>Peppermint Database &amp; Project Flow</dc:title>
  <dc:creator>Codex</dc:creator>
  <cp:lastModifiedBy>Codex</cp:lastModifiedBy>
</cp:coreProperties>`);
  write(path.join(buildDir, "docProps/app.xml"), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"
  xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>Codex</Application>
  <PresentationFormat>On-screen Show (4:3)</PresentationFormat>
  <Slides>${slides.length}</Slides>
</Properties>`);

  slides.forEach((slide, i) => {
    write(path.join(buildDir, `ppt/slides/slide${i + 1}.xml`), slideXml(slide, i));
    write(path.join(buildDir, `ppt/slides/_rels/slide${i + 1}.xml.rels`), `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"/>`);
  });

  execFileSync("zip", ["-qr", outFile, "."], { cwd: buildDir });
  fs.rmSync(buildDir, { recursive: true, force: true });
  console.log(`Created ${outFile}`);
}

build();
