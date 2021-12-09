import Image from 'next/image';
import Link from 'next/link';
import router from 'next/router';
import type { GetServerSideProps, NextPage } from 'next';
import { PaginationResponse, Technology } from '../types';

interface T {
  technologies: PaginationResponse<Technology>;
}

const LandingPage: NextPage<T> = ({ technologies }) => {
  const handleLogin = async () => {
    const res = await fetch('http://127.0.0.1:8000/auth/twitter');
    const data = await res.json();

    window.location.replace(data.redirect_to);
  };

  return (
    <main className="flex h-screen w-screen justify-center items-center bg-gray-200">
      <section className="shadow-2xl lg:m-40 bg-gray-100 rounded">
        <div className="pt-12 px-12 flex items-center justify-between">
          <span className="text-4xl md:text-6xl">🚀</span>
          <button
            onClick={handleLogin}
            className="bg-twitter text-sm md:text-base px-2 py-1 text-white rounded-lg"
          >
            Sign in with Twitter
          </button>
        </div>

        <div className="grid px-2 md:px-none grid-cols-1 md:grid-cols-8 gap-16 md:pt-16 pb-12 md:pb-24">
          <section className="col-span-1" />

          <section className="md:col-span-3 text-left flex flex-col items-start justify-center">
            <h1 className="text-2xl md:text-4xl font-extrabold">
              WhatImLearning
            </h1>
            <h3 className="md:text-xl my-6">
              Find out what your{' '}
              <span className="text-red">favorite creators</span> are learning
              and their <span className="text-red">favorite resources</span> 🚀
            </h3>

            <Link href="/home">
              <a className="bg-red text-white py-1 px-2 rounded-lg">Explore</a>
            </Link>
          </section>

          <section className="md:col-span-4 whitespace-nowrap overflow-y-hidden overflow-x-scroll">
            <div className="grid grid-cols-5 w-52 sticky left-0">
              <span className="text-xl cursor-pointer">⬅️</span>
              <span className="text-xl cursor-pointer">1️⃣</span>
              <span className="text-xl cursor-pointer">2️⃣</span>
              <span className="text-xl cursor-pointer">3️⃣</span>
              <span className="text-xl cursor-pointer">➡️</span>
            </div>

            <section className="grid grid-cols-landing-cards-grid gap-2">
              {technologies.results.map((tech) => (
                <article
                  className="flex items-end w-36 md:w-52 h-36 md:h-52 m-0 bg-cover bg-center cursor-pointer"
                  key={tech.id}
                  onClick={() => router.push(`/${tech.user.username}`)}
                  style={{ backgroundImage: `url(${tech.cover_img})` }}
                >
                  <figure className="w-full flex items-center p-1 bg-gradient-to-t from-gray-800">
                    <Image
                      alt={tech.user.username}
                      className="rounded-full"
                      height={65}
                      loader={({ src }) => src}
                      objectFit="cover"
                      objectPosition="center center"
                      src={tech.user.profile_image || 'sample-image'}
                      width={65}
                    />
                    <figcaption className="text-white text-sm ml-2">
                      @{tech.user.username}
                    </figcaption>
                  </figure>
                </article>
              ))}
            </section>
          </section>
        </div>

       <div className="text-right pb-4 pr-6">
          Crafted with ♥️ by{' '}
          <a
            href="https://twitter.com/AskJere"
            target="_blank"
            rel="noreferrer"
            className="text-red hover:underline"
          >
            @AskJere
          </a>
        </div>
      </section>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch('http://127.0.0.1:8000/technologies/?random=1');
    const technologies = await res.json();

    return {
      props: {
        technologies,
      },
    };
  } catch (error) {
    return { props: {} };
  }
};

export default LandingPage;
