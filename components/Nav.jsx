"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

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
    <nav className="container relative mx-auto py-6">
      {/* Flex Container For Nav Items */}
      <div className="flex items-center justify-between space-x-20 my-6">
        {/* Logo */}
        <div className="z-30">
        <Link href="/">
          <Image  src="/assets/images2/logo-bookmark.svg" alt="" id="logo" width={140} height={140} />
          </Link> 
        </div>

        {/* Menu Items */}
        {session?.user ? (
          <div
            className={`hidden md:flex items-center space-x-6 uppercase text-grayishBlue`}
          >
            <Link
              href="/create-prompt"
              className="px-2 py-1 text-base font-semibold text-white bg-softBlue rounded shadow-md border-2 border-softBlue 
               hover:bg-white hover:text-softBlue normal-case	
              "
            >
              Create Post
            </Link>
            <Link
              href="#"
              className="px-2 py-1   font-semibold text-white bg-black rounded shadow-md border-2 border-black 
              text-base hover:bg-white hover:text-black normal-case	 "
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
                class="w-10 h-10 rounded-full ring-2"
                
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
            <Link href="/create-prompt" className="block hover:text-softRed">
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
                  className={`fixed inset-0 z-20 flex-col items-center self-end w-full h-full m-h-screen px-6 py-1 pt-24 pb-4 tracking-widest text-white uppercase divide-y divide-gray-500 opacity-90 bg-black ${
                    menuOpen ? "flex" : "hidden"
                  }`}
                >
          
                  {/* <div className="w-full py-3 text-center">
                    <Link href="#download" className="block hover:text-softRed">
                      Other Sing In Comming soon ...
                    </Link>
                  </div> */}
                  <div className="w-full py-3 text-center">
                    <Link href="#" className="block hover:text-softRed" 
                        onClick={() => {
                          signIn(provider.id);
                        }}
                    >
                      <button class="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
        <svg class="mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="25px">
          <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
          <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
          <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
          <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
        </svg>
        Login with Google
      </button>
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
