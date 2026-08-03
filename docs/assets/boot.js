const bundlePath = "/assets/index-CCYHYNMB.js";
const response = await fetch(bundlePath, { cache: "no-store" });

if (!response.ok) {
  throw new Error(`PrintStock bundle could not be loaded (${response.status})`);
}

const source = (await response.text()).replace("T=S(),E=function", "T=C,E=function");
const blobUrl = URL.createObjectURL(new Blob([source], { type: "text/javascript" }));

try {
  await import(blobUrl);
  for (const file of ["/assets/bookmark-share.js", "/assets/print-confirm.js"]) {
    const extension = document.createElement("script");
    extension.src = file;
    document.head.append(extension);
  }
} finally {
  setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
}
