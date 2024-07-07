import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Squishy',
    Svg: require('@site/static/img/undraw_stability_ball_b-4-ia.svg').default,
    description: (
      <>
        Bouncy and squishy softbodies.
      </>
    ),
  },
  {
    title: 'Breakable',
    Svg: require('@site/static/img/undraw_breaking_barriers_vnf3.svg').default,
    description: (
      <>
        Permanently deform and break when a certain force is reached.
      </>
    ),
  },
  {
    title: 'With Holes',
    Svg: require('@site/static/img/undraw_donut_love_kau1.svg').default,
    description: (
      <>
        Create softbodies that have holes inside.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>

      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      {/*
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
      */}
    </section>
  );
}
