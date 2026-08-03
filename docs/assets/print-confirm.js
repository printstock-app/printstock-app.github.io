(() => {
  const approved = new WeakSet();
  const isPrintButton = (button) => {
    const label = (button.textContent || "").replace(/\s+/g, "").trim();
    return /^(まとめて印刷|印刷を開始|この設定で印刷|印刷する|同じ設定)$/.test(label);
  };
  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target.closest("button") : null;
    if (!target || !isPrintButton(target) || target.disabled) return;
    if (approved.has(target)) { approved.delete(target); return; }
    event.preventDefault();
    event.stopImmediatePropagation();
    if (window.confirm("印刷を開始しようとしています。\nページ範囲・部数をもう一度確認して、よろしければOKを押してください。")) {
      approved.add(target);
      target.click();
    }
  }, true);
})();
