import { toast } from "sonner";

export const SmartLink = ({ href, label, className, children, testId, soon }) => {
  if (href) {
    const external = /^https?:\/\//.test(href) || href.endsWith(".pdf");
    return (
      <a
        href={href}
        className={className}
        data-testid={testId}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      type="button"
      className={className}
      data-testid={testId}
      onClick={() => toast(soon || `${label} will be published here soon.`)}
    >
      {children}
    </button>
  );
};
