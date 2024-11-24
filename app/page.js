import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from "next/navigation";

import { verifyTransaction } from "@/app/(functions)/verifyTransaction";

import HomepageHero from "@/app/(components)/HomepageHero";
import RecentMenu from "@/app/(components)/RecentMenu";
import MostPurchasedMenu from "@/app/(components)/MostPurchasedMenu";
import CategoriesMenu from "@/app/(components)/CategoriesMenu";

export default async function Home({ searchParams }) {
  const session = await getServerSession(authOptions);
  const query = searchParams;

  if (session?.user.role === "admin") {
    redirect("/admin");
  }

  let verificationMsg;

  if (query.reference) {
    verificationMsg = await verifyTransaction(query.reference);

    console.log("the verification message: ", verificationMsg);
  }

  return (
    <section className="font-[family-name:var(--font-inter)] mx-10">
      <HomepageHero loginMsg={query.msg && query.msg} verificationMsg={verificationMsg && verificationMsg} session={session} />
      <RecentMenu />
      <MostPurchasedMenu />
      <CategoriesMenu />
    </section>
  );
}
