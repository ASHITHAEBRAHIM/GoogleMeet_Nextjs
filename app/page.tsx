import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import Background from "@/components/Background";

export default async function Index() {
  const canInitSupabaseClient = () => {
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex-1 w-full flex flex-col gap-20">
      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 px-6">
        <Header />
        <main className="flex-1 flex flex-col gap-6">
        <Background/>
        </main>
      </div>
    </div>
  );
}
