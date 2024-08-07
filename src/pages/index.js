import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';
import animation from '/static/img/rapier-vid.gif'
import ghost from '/static/img/ghost_collisions.gif'
import fluid from '/static/img/fluid_shader.gif'
import banner from '/static/img/rapier_banner.jpg'

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}
    style={{
      paddingTop: '30px',
    }}>
      <div className="container">
        <img
          src={banner}
          alt="Rapier Logo"
          width={512}
          style={{
            display: 'block',
            margin: '0 auto',
            border: 'solid 4px black',
            borderRadius: '10px',
          }}
        />

        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div style={{ textAlign: 'center', margin: 'auto', display: 'block', paddingBottom: '10px' }}>
          <img
              src={animation}
              alt="loading..."
              height={160}
              style={{
                "border-top-left-radius": "5px",
                "border-bottom-left-radius": "5px",
                borderRadius: '10px',
                border: 'solid 4px black',
              }}
            />
            <img
              src={ghost}
              alt="loading..."
              height={160}
              style={{
                "border-top-right-radius": "5px",
                "border-bottom-right-radius": "5px",
                borderRadius: '10px',
                border: 'solid 4px black',
              }}
            />
            <img
              src={fluid}
              alt="loading..."
              height={160}
              style={{
                "border-top-right-radius": "5px",
                "border-bottom-right-radius": "5px",
                borderRadius: '10px',
                border: 'solid 4px black',
              }}
            />
          </div>

        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Documentation
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Rapier Physics addon for Godot that a new physics server for 2D or 3D with better stability, performance, no ghost collisions and liquids.">
      <HomepageHeader />

      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
