import React from "react";

const TokenContext = React.createContext<{
  token: string;
} | null>(null);

export const TokenProvider: React.FC<{
  token: string;
  children: React.ReactNode;
}> = ({ token, children }) => {
  return (
    <TokenContext.Provider value={{ token }}>{children}</TokenContext.Provider>
  );
};

export const useTokenContext = () => {
  const context = React.useContext(TokenContext);
  if (!context) {
    throw new Error("useTokenContext must be used within a TokenProvider");
  }
  return context;
};
