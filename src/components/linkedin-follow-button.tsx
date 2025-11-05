import Link from "next/link";
import { Linkedin } from "lucide-react";

export function LinkedinFollowButton() {
  return (
    <Link
      href="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=hamza-eraoui"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-[#0A66C2] text-white hover:bg-[#0A66C2]/90"
    >
      <Linkedin className="mr-2 h-4 w-4" /> Follow on LinkedIn
    </Link>
  );
}
