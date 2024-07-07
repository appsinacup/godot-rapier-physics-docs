import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Fast and Stable',
    Svg: require('@site/static/img/undraw_to_the_stars_re_wq2x.svg').default,
    description: (
      <>
        Supports SIMD (Single Instruction/Multiple Data) optimizations and parallelism to get the best performance,
        while offering better stability in simulations than Godot Physics.
      </>
    ),
  },
  {
    title: 'Drop-in Replacement',
    Svg: require('@site/static/img/undraw_real_time_collaboration_c62i.svg').default,
    description: (
      <>
        1 to 1 Compatibility with Godot Physics. Everything is supported, from Rigidbodies, Areas, Shapes and Joints to Character Controller.
      </>
    ),
  },
  {
    title: '2D and 3D',
    Svg: require('@site/static/img/undraw_3d_modeling_re_6vi2.svg').default,
    description: (
      <>
        Works on both 2D and 3D thanks to the Rapier and Salva libraries it uses internally.
      </>
    ),
  },
  {
    title: 'Fluids',
    Svg: require('@site/static/img/undraw_beer_xg5f.svg').default,
    description: (
      <>
        Simulate different fluids with different density and viscosity that interacts with other objects.
      </>
    ),
  },
  {
    title: 'Save Checkpoints',
    Svg: require('@site/static/img/undraw_export_files_re_99ar.svg').default,
    description: (
      <>
        Using Rust serde this plugin is able to save and load the whole state in binary or json.
      </>
    ),
  },
  {
    title: 'Cross-platform deterministic',
    Svg: require('@site/static/img/undraw_sync_re_492g.svg').default,
    description: (
      <>
        Cross-platform deterministic on all IEEE 754-2008 compliant 32- and 64-bits platforms.
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
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
