import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';
import animation from '/static/img/rapier-vid.gif'
import banner from '/static/img/rapier_banner.jpg'

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <img 
          src={banner} 
          alt="Rapier Logo" 
          width={512} 
          style={{
            display: 'block', 
            margin: '0 auto',
          }}
        />

        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <p style={{textAlign: 'center'}}><img 
          src={animation} 
          alt="loading..." 
          width={256} 
          style={{
            marginRight: '64px', 
            display: 'block', 
            margin: '0 auto',
          }}
        /></p>
        
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
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Rapier Physics addon for Godot that a new physics server for 2D or 3D with better stability.">
      <HomepageHeader />

      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
