import React from "react";
import "remixicon/fonts/remixicon.css";

function LocationSearchPanel({ suggestions, onSelectSuggestion }) {
  return (
    <div>
      {suggestions && suggestions.length > 0 ? (
        suggestions.map((suggestion, i) => (
          <div
            key={i}
            className="gap-4 border-2 p-3 rounded-xl flex items-center my-3 border-gray-200 cursor-pointer hover:border-black"
            onClick={() => onSelectSuggestion(suggestion.description)}
          >
            <h2 className="bg-[#eee] flex h-10 w-10 items-center justify-center rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">{suggestion.description}</h4>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No suggestions available</p>
      )}
    </div>
  );
}

export default LocationSearchPanel;