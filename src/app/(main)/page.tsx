import HomePage from "@/app/(main)/_components/home-page/home-page";
import LandingPage from "@/app/(main)/_components/landing-page/landing-page";
import { cookies } from "next/headers";

// import HomeAfterLogin from "./(protected)/home/home-page";

export default async function Page() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";

  if (!accessToken) {
    return <LandingPage />;
  }

  return <HomePage accessToken={accessToken} />;
}
