import React from "react";
import "../components/styles/Dashboard.css"

export default function StatsCard({ title, value, change, children }){
    const positive = change && change > 0;

    return(
        <div className="stat-card">
            <div className="stat-top">
                <h3 className="stat-title">{title}</h3>
                {children && <div className="stat-icon">{children}</div>}
            </div>
            <div className="stat-value">{value}</div>
            {typeof change === "number" && (
                <div className={`stat-change ${positive ? "positive" : "negative"}`}>
                    {positive ? "↑" : "↓"} {Math.abs(change)}%
                </div>
            )}
        </div>
    )
}