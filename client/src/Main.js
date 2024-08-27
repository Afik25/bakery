import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";

const Main = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage("fr");
  }, []);

  return (
    <main className="">
      <Outlet />
    </main>
  );
};

export default Main;
