import React, { ReactNode } from "react";

type Props = {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
  actions?: ReactNode;
};

export default function CommonCard({ title, subtitle, children, className = "", actions }: Props) {
  return (
    <div className={`bg-white rounded-2xl shadow-md p-6 ${className}`}>
      {(title || subtitle || actions) && (
        <div className="flex items-start justify-between mb-4">
          <div>
            {title && <h3 className="text-2xl font-semibold">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>
          {actions && <div>{actions}</div>}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}
