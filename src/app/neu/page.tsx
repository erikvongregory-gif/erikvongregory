import { redirect } from "next/navigation";

/** Alte Preview-URL → neue öffentliche Startseite */
export default function NeuHomeRedirect() {
  redirect("/");
}
