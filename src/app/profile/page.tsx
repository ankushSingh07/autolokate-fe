import { profileMetadata } from "./config/metadata";
import { ProfilePageContent } from "./components/ProfilePageContent";

export const metadata = profileMetadata;

export default function ProfilePage() {
  return (
    <main className="relative min-h-[calc(100vh-4rem)] bg-background">
      <ProfilePageContent />
    </main>
  );
}
