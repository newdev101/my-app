export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-3">
        We value your privacy. All image compression happens locally in your
        browser using open-source libraries. We do not upload, store, or share
        your files with any third party.
      </p>
      <p>
        If you have questions about privacy, feel free to{" "}
        <a href="/contact" className="text-teal-500 hover:underline">
          contact us
        </a>.
      </p>
    </div>
  );
}
