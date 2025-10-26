import React from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: React.ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Ultra Rápido",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <>
        Construido con <strong>Hono</strong>, uno de los frameworks más rápidos
        para Node.js. Respuestas en milisegundos con mínimo overhead.
      </>
    ),
  },
  {
    title: "CRUD Completo",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <>
        Operaciones completas de gestión de usuarios: crear, leer, actualizar y
        eliminar. Incluye validaciones robustas y manejo de errores.
      </>
    ),
  },
  {
    title: "SQLite Integrado",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        Base de datos SQLite con <code>better-sqlite3</code> para persistencia
        local. Sin configuración compleja, funciona out-of-the-box.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
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

export default function HomepageFeatures(): React.ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((feature, idx) => (
            <React.Fragment key={idx}>
              <Feature
                title={feature.title}
                Svg={feature.Svg}
                description={feature.description}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
