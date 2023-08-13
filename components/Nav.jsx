"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Logo from "../public/assets/images2/logo-bookmark.svg";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  //use providers to sign in !
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);
  //get session from the useSession
  const { data: session } = useSession();

  return (
    <nav className="container relative mx-auto p-6">
      {/* Flex Container For Nav Items */}
      <div className="flex items-center justify-between space-x-20 my-6">
        {/* Logo */}
        <div className="z-30">
        <Link href="/">
          <Image src={Logo} alt="" id="logo" width={140} height={100} />
          </Link>
        </div>

        {/* Menu Items */}
        {session?.user ? (
          <div
            className={`hidden md:flex items-center space-x-10 uppercase text-grayishBlue`}
          >
            <Link
              href="/create-propmpt"
              className="px-3 py-2 text-s font-semibold text-white bg-softBlue rounded shadow-md border-2 border-softBlue 
              text-base hover:bg-white hover:text-softBlue
              "
            >
              Create Post
            </Link>
            <Link
              href="#"
              className="px-3 py-2   font-semibold text-white bg-black rounded shadow-md border-2 border-black 
              text-base hover:bg-white hover:text-black "
              onClick={signOut}
            >
              Sign Out
            </Link>

            <Link
              href="/profile"
              className="tracking-widest hover:text-softRed"
            >
              <Image width={80} height={80}
                src={session?.user.image}
                alt="profile"
                class="w-10 h-10 rounded-full ring-4 to-blue-500"
                
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <div
                    key={provider.name}
                    className={`hidden md:flex items-center space-x-10 uppercase text-grayishBlue`}
                  >
                    <Link
                      href="#features"
                      className="tracking-widest hover:text-softRed"
                    >
                      Features
                    </Link>
                    <Link
                      href="#download"
                      className="tracking-widest hover:text-softRed"
                    >
                      Download
                    </Link>

                    <Link
                      href="#"
                      className="px-8 py-2 text-white bg-softRed border-2 border-softRed rounded-lg shadow-md hover:text-softRed hover:bg-white"
                      onClick={() => {
                        signIn(provider.id);
                      }}
                    >
                      Login
                    </Link>
                  </div>
                );
              })}
          </>
        )}

        {/* Hamburger Button */}

        {
          <button
            id="menu-btn"
            className={`z-30 block md:hidden focus:outline-none hamburger ${
              menuOpen ? "open" : ""
            }`}
            onClick={toggleMenu}
          >
            <span className="hamburger-top"></span>
            <span className="hamburger-middle"></span>
            <span className="hamburger-bottom"></span>
          </button>
        }
      </div>
      {/* Mobile Menu */}
      {session?.user ? (
        <div
          id="menu"
          className={`fixed inset-0 z-20 flex-col items-center self-end w-full h-full m-h-screen px-6 py-1 pt-24 pb-4 tracking-widest text-white uppercase divide-y divide-gray-500 opacity-90 bg-veryDarkBlue ${
            menuOpen ? "flex" : "hidden"
          }`}
        >
          <Link
            href="/profile"
            className="w-full  px-20 py-3 flex justify-between items-center"
          >
            <div className="tracking-widest">
              <Image
                src={session?.user.image}
                width={80}
                height={80}
                alt="profile"
                class="w-10 h-10 rounded-full ring-4 to-blue-500"
              />
            </div>
            <p className="hover:text-softRed">My Profile </p>
          </Link>
          <div className="w-full py-3 text-center">
            <Link href="#download" className="block hover:text-softRed">
              Create Prompt
            </Link>
          </div>
          <div className="w-full py-3 text-center">
            <Link href="#" className="block hover:text-softRed"
            onClick={signOut}
            >
              Sign Out
            </Link>
          </div>
        </div>
      ) : (
        <>
          {providers &&
            Object.values(providers).map((provider) => {
              return (
                <div
                  id="menu"
                  className={`fixed inset-0 z-20 flex-col items-center self-end w-full h-full m-h-screen px-6 py-1 pt-24 pb-4 tracking-widest text-white uppercase divide-y divide-gray-500 opacity-90 bg-veryDarkBlue ${
                    menuOpen ? "flex" : "hidden"
                  }`}
                >
          
                  <div className="w-full py-3 text-center">
                    <Link href="#download" className="block hover:text-softRed">
                      Other Sing In
                    </Link>
                  </div>
                  <div className="w-full py-3 text-center">
                    <Link href="#" className="block hover:text-softRed" 
                        onClick={() => {
                          signIn(provider.id);
                        }}
                    >
                      Sign In Google
                    </Link>
                  </div>
                </div>
              );
            })}
        </>
      )}
    </nav>
  );
};

export default Nav;
