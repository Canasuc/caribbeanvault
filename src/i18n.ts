import { getRequestConfig } from "next-intl/server";
import fr from "./messages/fr.json";
import en from "./messages/en.json";
import es from "./messages/es.json";

const messages = { fr, en, es };

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) as "fr" | "en" | "es";
  return {
    locale,
    messages: messages[locale] ?? messages.fr,
  };
});