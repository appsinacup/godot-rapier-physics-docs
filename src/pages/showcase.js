import clsx from 'clsx';
import {useEffect, useState} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './showcase.module.css';

const showcaseItems = [
  {
    title: 'Scribble Bots',
    description:
      'Draw your robot, play as your drawing! Face your friends in Scribble Bots, a 2D, physics based sandbox party game. Will your robot be a mechanical masterpiece, or a dysfunctional abomination?',
    image: '/img/showcase/scribblebots.jpg',
    platform: 'Steam',
    link: 'https://store.steampowered.com/app/3904960/Scribble_Bots/',
    quote:
      'It was completely unplayable using the normal godot physics engine, there were so many edge cases where people would draw something that would instantly teleport off the map, rapier fixed all those problems instantly and also made it perform a lot better.',
  },
  {
    title: 'Robot & Froggy',
    description:
      'Robot & Froggy is a heartfelt physics based co-op adventure about friendship and courage. Journey through mysterious forests and climb the greatest heights to stop THE MACHINE from consuming all habitat. Choose Robot or Froggy, combine your skills or alone, and climb the mountain!',
    image: '/img/showcase/robots_and_froggy.jpg',
    platform: 'Steam',
    link: 'https://store.steampowered.com/app/3788720/Robot__Froggy/',
    quote:
      'We use rapier 2d fully for better control of the whole physics stuff',
  },
  {
    title: 'Animoz',
    description:
      "Match two animals of the same size to get a bigger one! Bigger animoz mean more points! Can you get the Elephant? With its unique physics system, hope is never lost in Animoz. Little animals make everything move around and can save desperate situations.",
    image: '/img/showcase/animoz.png',
    platform: 'itch.io',
    link: 'https://geowarin.itch.io/animoz',
    quote:
      'A lot of the appeal of the game relies on physics, and the default physics system in godot was not convincing.',
  },
  {
    title: 'Dewdrop',
    description:
      'A generative music puzzle game. Every bounce becomes a part of your composition. Solve puzzles to unlock new sounds, and experiment with them in the sandbox. Draw vines, spawn droplets, and let physics write the melody.',
    image: '/img/showcase/dewdrop.jpg',
    platform: 'Steam',
    link: 'https://store.steampowered.com/app/4163480/Dewdrop/',
    quote: 'It is a god send for my type of game 🙂 thank you”',
  },
  {
    title: 'ploink',
    description:
      "Wacky plinko-inspired roguelike. Design a board of weird items, drop balls with silly little faces then watch the physics explode into a satisfying chain-reaction of numbers until your CPU explodes (Your CPU won't actually explode)",
    image: '/img/showcase/ploink.jpg',
    platform: 'Steam',
    link: 'https://store.steampowered.com/app/3929350/ploink/',
    quote: "A lot of physics issues were immediately gone when I switched. I would honestly say that the game wouldn't even exist in its current state if it wasn't for Rapier. So big thumbs up to you👍”",
  },
];

function shuffleItems(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
}

function ShowcaseCard({title, description, image, platform, link, quote}) {
  return (
    <article className={clsx('card', styles.card)}>
      <div className="card__image">
        <img src={image} alt={title} className={styles.previewImage} />
      </div>
      <div className={clsx('card__body', styles.cardBody)}>
        <Heading as="h2">{title}</Heading>
        <p>{description}</p>
        <p className={styles.quote}>{quote}</p>
        <div className={styles.cardMeta}>
          <span className={styles.platform}>{platform}</span>
          <Link className="button button--primary" href={link}>
            Open store page
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function ShowcasePage() {
  const [displayItems, setDisplayItems] = useState(showcaseItems);

  useEffect(() => {
    setDisplayItems(shuffleItems(showcaseItems));
  }, []);

  return (
    <Layout
      title="Showcase"
      description="Community and demo projects built with Godot Rapier Physics.">
      <main className="container margin-vert--lg">
        <section className={styles.hero}>
          <Heading as="h1">Showcase</Heading>
          <p className={styles.subtitle}>
            Projects build with Godot Rapier Physics. Add your project below.
          </p>
          <div className={styles.actions}>
            <Link
              className="button button--primary button--lg"
              href="https://github.com/appsinacup/godot-rapier-physics-docs/issues/new/choose">
              Submit your project
            </Link>
          </div>
        </section>

        <section className={styles.grid}>
          {displayItems.map((item) => (
            <ShowcaseCard key={item.title} {...item} />
          ))}
        </section>
      </main>
    </Layout>
  );
}
