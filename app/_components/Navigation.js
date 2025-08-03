import Link from "next/link";
import { auth } from "../_lib/auth";

// The ROUTE which using the component will automatically converted to dynamic route as the auth function is using the cookies and headers for authentication
export default async function Navigation() {
  const session = await auth();

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user ? (
            <Profile user={session.user} />
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

function Profile({ user }) {
  return (
    <Link href="/account">
      <div className="flex gap-2">
        <img
          src={user.image}
          className="h-8 rounded-full"
          alt={user.name}
          referrerPolicy="no-referrer"
        />
        <span>Guest area</span>
      </div>
    </Link>
  );
}
