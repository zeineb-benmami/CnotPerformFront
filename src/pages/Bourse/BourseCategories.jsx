// Import statements
import React, { useState } from 'react';
import {
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody
} from "reactstrap";
import { useNavigate } from 'react-router-dom';

// Image imports
import univ from "../../assets/images/icon/univolymp.png";
import developpement from "../../assets/images/icon/devsport.png";
import valeur from "../../assets/images/icon/valeursolymp.png";
import admin from "../../assets/images/icon/administration.png";
import entourage from "../../assets/images/icon/entourage.png";

// Card Component
const Card = ({ image, title, subtitle, children, footer }) => (
  <div className="bg-black text-white rounded-lg shadow-lg overflow-hidden w-full sm:w-96 my-3">
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <h3 className="text-lg text-gray-400 mb-4">{subtitle}</h3>
      <p className="mb-4">{children}</p>
      <div className="flex justify-end space-x-2">{footer}</div>
    </div>
  </div>
);

function BourseCategories() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [open, setOpen] = useState('');

  const toggle = () => setModal(!modal);

  const toggleAccordion = (id) => {
    setOpen(open === id ? '' : id);
  };

  const cardsData = [
    {
      image: univ,
      title: "Universalité des Jeux Olympiques",
      subtitle: "Formation et éducation",
      description:
        "Les programmes mondiaux Universalité des Jeux Olympiques visent à donner la possibilité aux CNO du monde entier de soutenir des athlètes et équipes d’élite en leur apportant un soutien financier et technique dans leur préparation pour les Jeux",
      color:'#0369a1',
      domaine: 'Athlètes et développement du sport'
    },
    {
      image: developpement,
      title: "Développement du Sport",
      subtitle: "Promotion et soutien",
      description:
        "Les programmes mondiaux Développement du sport sont consacrés à la promotion du développement du sport, de la relève à l’élite, en collaboration avec les Fédérations Internationales et nationales et d’autres partenaires clés. Ils offrent quatre niveaux de soutien : soutien aux jeunes athlètes sur leur chemin vers une carrière prometteuse et une qualification pour les JOJ, soutien aux athlètes dans leur transition du niveau régional ou continental au niveau mondial, soutien aux athlètes ayant dû fuir leur pays en leur permettant de concourir en tant qu’athlètes réfugiés, contribution au développement du sport à grande échelle dans différents pays en accompagnant le renforcement du système sportif national.",
      color:'#fcd34d',
      domaine: 'Athlètes et développement du sport',
    },
    {
      image: valeur,
      title: "Valeurs Olympiques",
      subtitle: "Respect, Excellence, Amitié",
      description:
        "Le programme des valeurs olympiques vise à fournir le soutien nécessaire aux CNO pour promouvoir le sport pour tous, ainsi que les valeurs et principes fondamentaux de l’Olympisme dans le domaine du sport et de l’éducation, tout en assurant des conditions de pratique sportive équitables sans discrimination d’aucune sorte et en soutenant la santé et l’intégrité des athlètes. Le programme est structuré autour de deux domaines d’action principaux : au niveau des organisations( l’objectif du programme est de veiller à ce que les organisations sportives soient gérées de manière sûre, durable et inclusive), au niveau communautaire(le but est d’aider davantage de personnes à s’engager dans le sport et avoir une activité physique et de promouvoir une éducation, une culture et un héritage fondés sur l’Olympisme et ses valeurs.)",
      color:'#dc2626',
      domaine: 'Valeurs'
    },
    {
      image: admin,
      title: "Gestion des CNO et partage de connaissances",
      subtitle: "Gestion efficace",
      description:
        "Les programmes mondiaux ci-dessous ont pour priorité d’aider les CNO à développer et maintenir des structures administratives solides et durables afin d’offrir à leurs athlètes et membres le soutien dont ils ont besoin. Ils visent à permettre l’accès aux dirigeants et collaborateurs des CNO à un large éventail de formations et de cours dans de nombreux domaines liés à la gestion efficace d’un CNO au quotidien. Les enseignements et le soutien mutuels sont également importants ; c’est pourquoi ces programmes encouragent aussi les partages de connaissances et d’expérience entre CNO.",
      color:'#292524',
      domaine: 'Développement des capacités et administration'
    },
    {
      image: entourage,
      title: "Entourage",
      subtitle: "Communauté et soutien",
      description:
        "Pour tout athlète, pour toute équipe, évoluer dans le bon environnement est essentiel pour progresser. Tant de facteurs sont primordiaux pour un bon entourage : bénéficier du soutien de personnes sensibilisées à des sujets clés tels que la protection des athlètes intègres et la lutte contre le dopage, la discrimination, le harcèlement et la manipulation des compétitions. Les programmes mondiaux Entourage soutiennent les membres de l’entourage, notamment les entraîneurs, en leur proposant des outils pour améliorer leurs compétences à tous les niveaux.",
      color:'#16a34a',
      domaine: 'Athlètes et développement du sport'
    },
  ];

  return (
    <React.Fragment>
      <section className="offer-section" id="bourses">
        <h2>Nos bourses</h2>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {cardsData.map((card, index) => (
              <Card
                key={index}
                image={card.image}
                title={card.title}
                subtitle={card.subtitle}
                footer={
                  <Button
                    color="primary"
                    className="font-16 btn-block m-auto"
                    style={{ borderRadius: "25px" }}
                    onClick={() => {
                      setSelectedProgram(card);
                      toggle();
                    }}
                  >
                    Consulter
                  </Button>
                }
              >
                {card.description}
              </Card>
            ))}
          </div>
        </div>
        <Modal isOpen={modal} toggle={toggle} >
          <ModalHeader toggle={toggle}>{selectedProgram?.title}</ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="auto">
                <img 
                  className="img-fluid rounded" 
                  src={selectedProgram?.image} 
                  alt="Skote" 
                  style={{ backgroundColor: selectedProgram?.color }} 
                />
              </Col>
              <Col>
                <h2 className="text-2xl font-semibold">{selectedProgram?.domaine}</h2>
              </Col>
            </Row>
            <Row className='mt-3'>
              <h5>Ce groupe comprend les programmes suivants :</h5>
              <Col>
                <Accordion open={open} toggle={toggleAccordion}>
                  {selectedProgram?.title === 'Universalité des Jeux Olympiques' && (<>
                  <AccordionItem>
                    <AccordionHeader targetId="1">Bourses olympiques pour athlètes</AccordionHeader>
                    <AccordionBody accordionId="1">
                      Destinés à tous les CNO et à leurs athlètes, en particulier à ceux qui
                      en ont le plus grand besoin, ces deux programmes offrent un soutien
                      financier et technique aux athlètes d’élite qui ont le potentiel pour se
                      qualifier pour les Jeux Olympiques, augmentant ainsi l’universalité de
                      ces derniers. Ces bourses individuelles sont versées mensuellement
                      aux bénéficiaires dans le but de contribuer à leur préparation et
                      leur qualification pour les Jeux Olympiques, que ce soit dans leur
                      pays ou dans un centre d’entraînement de haut niveau à l’étranger.
                      Pour Paris 2024, les CNO ayant les plus grandes délégations aux
                      Jeux Olympiques pourront choisir une option à la carte leur offrant
                      une flexibilité supplémentaire pour l’utilisation du programme.
                    </AccordionBody>
                  </AccordionItem>
                  <AccordionItem>
                      <AccordionHeader targetId="2">Subvention pour les sports d’équipe</AccordionHeader>
                      <AccordionBody accordionId="2">
                        Le programme de subvention pour les sports d’équipe permet
                        aux CNO de sélectionner une équipe qui bénéficiera d’un soutien
                        technique et financier pour toute la durée du plan 2021-2024 afin de
                        s’entraîner et participer à des compétitions régionales, continentales
                        ou mondiales, et tenter de se qualifier pour les Jeux Olympiques.
                        Dans le but d’augmenter la participation féminine à ce programme,
                        les CNO ont la possibilité de diviser le budget disponible entre deux
                        équipes, pour autant que l’une d’entre elles soit une équipe féminine.
                      </AccordionBody>
                    </AccordionItem>
                    </>)}
                  {selectedProgram?.title === 'Entourage' && (<>
                  <AccordionItem>
                    <AccordionHeader targetId="3">Stages techniques pour entraîneurs</AccordionHeader>
                    <AccordionBody accordionId="3">
                    Les entraîneurs officiellement reconnus par leur fédération
                    nationale et actifs dans leur pays ont la possibilité d’effectuer des
                    stages de courte durée de différents niveaux, axés sur différentes
                    thématiques, dans le but d’améliorer leurs connaissances
                    d’entraîneur, éducateur, formateur d’entraîneur, etc. Les CNO
                    peuvent postuler pour les formations standards spécifiques aux
                    sports, ainsi que pour des cours spécialisés en condition physique,
                    planification de l’entraînement, préparation mentale, nutrition, etc.
                    </AccordionBody>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionHeader targetId="4">Bourses olympiques pour entraîneurs</AccordionHeader>
                    <AccordionBody accordionId="4">
                    Ce programme permet aux entraîneurs officiellement
                    reconnus par leur fédération nationale et actifs dans leur pays
                    de suivre une formation continue dans un centre de haut
                    niveau, une université ou un établissement géré par une FI.
                    Trois types de formation sont proposés : sciences du sport,
                    formation sportive spécifique et formation sur mesure.
                    </AccordionBody>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionHeader targetId="5">Transition de carrière des athlètes</AccordionHeader>
                    <AccordionBody accordionId="5">
                    Ce programme aide les CNO à soutenir leurs athlètes à diverses
                    étapes de leur carrière grâce à des mesures de soutien et une
                    assistance financière afin de leur permettre de réussir leur
                    reconversion professionnelle. Les olympiens peuvent développer
                    un projet de formation individuel, participer au programme
                    Athlete365 Business Accelerator en entreprenariat, ou s’inscrire à
                    un master en éthique et intégrité du sport (MAiSI). Pour les CNO
                    ayant une commission des athlètes active mais ne disposant
                    pas d’un programme de carrière national, les ateliers Athlete365
                    Career+ Power Up Outreach constituent une autre possibilité.
                    </AccordionBody>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionHeader targetId="6">Subvention pour les activités des commissions des athlètes des CNO</AccordionHeader>
                    <AccordionBody accordionId="6">
                    Le but de cette subvention est d’aider les athlètes à contribuer au
                    développement d’un réseau global de représentation des athlètes
                    au niveau national, ceci en renforçant le soutien financier direct
                    aux activités des commissions des athlètes des CNO. Cette
                    subvention est à la disposition de tous les CNO, avec pour objectif
                    d’apporter à ceux qui n’ont pas de commission des athlètes le
                    soutien nécessaire pour en créer une, et financer les activités
                    proposées par les commissions des athlètes déjà actives.
                    </AccordionBody>
                  </AccordionItem>
                  </>)}
                  {selectedProgram?.title === 'Développement du Sport' && (<><AccordionItem>
                    <AccordionHeader targetId="7">Développement du système sportif national</AccordionHeader>
                    <AccordionBody accordionId="7">
                    À travers ce programme axé spécifiquement sur le développement
                    du système sportif national, les CNO ont la possibilité de développer
                    et de renforcer leurs structures d’entraînement de base et leurs
                    systèmes sportifs, et ce en mettant en place un plan d’action à
                    moyen ou long terme propre à un ou plusieurs sports inscrits au
                    programme des Jeux Olympiques. Les CNO et leurs fédérations
                    nationales sont aussi encouragés à examiner les possibilités de
                    développement des athlètes et les politiques de bonne gouvernance,
                    à renforcer la capacité administrative pour soutenir les activités des
                    entraîneurs et des athlètes, à optimiser les aspects existants de leur
                    gestion globale, etc., ces points étant tous intrinsèquement liés.
                    </AccordionBody>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionHeader targetId="8">Subvention pour athlètes de niveau continental</AccordionHeader>
                    <AccordionBody accordionId="8">
                    Cette subvention apporte une aide financière et technique
                    aux CNO pour préparer leurs athlètes de niveau continental
                    aux Jeux Olympiques et aux Jeux multisports mondiaux,
                    continentaux et régionaux. Elle peut financer des camps d’entraînement ou la participation des athlètes à certaines compétitions
                    pertinentes pour leur programme d’entraînement.
                    </AccordionBody>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionHeader targetId="9">Développement des jeunes athlètes</AccordionHeader>
                    <AccordionBody accordionId="9">
                    Le programme de développement des jeunes athlètes offre une
                    assistance aux CNO pour identifier et entraîner leurs jeunes athlètes
                    pour les compétitions juniors ainsi que pour aider ces jeunes talents
                    à participer à des épreuves de qualification en vue de leur sélection
                    pour les Jeux Olympiques de la Jeunesse d’été et d’hiver. Les
                    CNO ont trois options de soutien : soutien technique et financier
                    pour identifier et entraîner les jeunes athlètes ; soutien financier
                    pour participer aux compétitions de qualification ; opportunités
                    d’entraînement et de compétition de durée variable organisées
                    par les FI pour un nombre limité de jeunes athlètes talentueux.
                    </AccordionBody>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionHeader targetId="10">Soutien aux athlètes réfugiés</AccordionHeader>
                    <AccordionBody accordionId="10">
                    Ce programme permet aux CNO de pays accueillant des
                    réfugiés d’identifier et de soutenir des athlètes d’élite réfugiés.
                    Il octroie une subvention d’entraînement pour la préparation et
                    la participation aux compétitions internationales, ainsi qu’une
                    assistance technique et financière aux CNO et aux camps de
                    réfugiés pour des activités spécifiques liées à l’identification,
                    l’entraînement et la formation d’athlètes réfugiés.
                    </AccordionBody>
                  </AccordionItem>
                  </>)}
                  {selectedProgram?.title === 'Valeurs Olympiques' && (<>
                  <AccordionItem>
                    <AccordionHeader targetId="11">Valeurs olympiques</AccordionHeader>
                    <AccordionBody accordionId="11">
                    <p>À cette fin, la Solidarité Olympique fournit une aide financière pour trois types de projets principaux :</p>
                    <ul style={{ listStyleType: "square" }}>
                      <li>soutien aux initiatives menées par le CNO ou en collaboration avec une organisation partenaire</li>
                      <li>bourses de formation des valeurs olympiques, pour les candidats désignés par les CNO, destinées à renforcer leurs connaissances grâce à diverses opportunités de formation</li>
                      <li>soutien pour les célébrations de la Journée olympique, afin de s’assurer que tous les CNO célèbrent chaque année l’héritage olympique en organisant des activités sportives, culturelles et éducatives qui s’adressent à tous – sans distinction d’âge, de sexe, de milieu social ou d’aptitude sportive.</li>
                    </ul>
                    </AccordionBody>
                  </AccordionItem>
                  </>)}
                  {selectedProgram?.title === 'Gestion des CNO et partage de connaissances' && (<><AccordionItem>
                    <AccordionHeader targetId="12">Développement de l’administration des CNO</AccordionHeader>
                    <AccordionBody accordionId="12">
                    <p>Deux options sont offertes aux CNO dans le cadre de ce programme :</p>
                    <ul style={{ listStyleType: "square" }}>
                      <li>La subvention administrative leur permet de gérer leurs organisations grâce à une contribution couvrant leurs frais de fonctionnement. Une subvention supplémentaire est disponible pour les CNO dont les sources de financement sont limitées afin de leur permettre de se doter de structures administratives plus durables, essentielles pour élargir leurs activités et leurs services.</li>
                      <li>Les initiatives en gestion des CNO donnent la possibilité aux CNO de renforcer leurs structures de gestion (et remédier à leurs points faibles) en bénéficiant d’une contribution pour des projets visant à améliorer certains aspects de leur gestion, en particulier avoir une gestion financière solide et une structure de gouvernance adéquate, un plan stratégique, un organigramme cohérent, du personnel bien formé, du matériel informatique et des outils de communication appropriés à la taille du CNO.</li>
                      <li>soutien pour les célébrations de la Journée olympique, afin de s’assurer que tous les CNO célèbrent chaque année l’héritage olympique en organisant des activités sportives, culturelles et éducatives qui s’adressent à tous – sans distinction d’âge, de sexe, de milieu social ou d’aptitude sportive.</li>
                    </ul>
                    </AccordionBody>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionHeader targetId="13">Cours nationaux pour dirigeants sportifs</AccordionHeader>
                    <AccordionBody accordionId="13">
                    Ce programme a pour objectif de développer les compétences
                    des CNO et des organisations qui leur sont affiliées en offrant la
                    possibilité aux CNO de dispenser des formations en gestion sous
                    la forme de cours d’administration sportive et de cours avancés
                    en management du sport, destinés aux dirigeants sportifs des
                    organisations sportives nationales et régionales du pays. La Solidarité
                    Olympique fournit le matériel de formation, le cadre pour l’enseignement des cours et soutient la formation des directeurs de cours.
                    </AccordionBody>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionHeader targetId="14">Formation internationale en management du sport</AccordionHeader>
                    <AccordionBody accordionId="14">
                    Ce programme vise à développer les compétences des CNO
                    et des organisations qui leur sont affiliées en proposant à des
                    dirigeants sportifs de haut niveau sélectionnés par leurs CNO
                    de participer au MEMOS (master exécutif en management des
                    organisations sportives), une formation supérieure en gestion du
                    sport reconnue sur le plan international. Dispensé par un réseau
                    d’universités, le MEMOS comporte plusieurs modules répartis
                    sur une année. Les participants sont appelés à réaliser un projet
                    professionnel, menés sous la supervision d’un tuteur, visant à
                    améliorer un aspect de la gestion de leur organisation sportive.
                    </AccordionBody>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionHeader targetId="15">Échanges entre CNO</AccordionHeader>
                    <AccordionBody accordionId="15">
                    Le but de ce programme est de développer les compétences des
                    CNO et des organisations qui leur sont affiliées en encourageant
                    et en facilitant l’échange de connaissances et d’expérience entre
                    les CNO. Les CNO désireux de partager leur expérience, leurs
                    connaissances ou leurs ressources avec les CNO qui en ont
                    le plus besoin sont invités à contacter la Solidarité Olympique
                    afin d’identifier la meilleure façon d’organiser ce partage. En
                    outre, ils peuvent proposer d’organiser des séminaires sur des
                    sujets ayant un intérêt particulier pour des groupes spécifiques
                    de CNO. La Solidarité Olympique peut aussi proposer des
                    ateliers sur une thématique spécifique à certains CNO.
                    </AccordionBody>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionHeader targetId="16">Forums pour les CNO et leurs athlètes </AccordionHeader>
                    <AccordionBody accordionId="16">
                    Les forums constituent une occasion unique de réunir les CNO, les
                    athlètes d’un continent et la Solidarité Olympique pour échanger
                    sur des thématiques spécifiques. Ce programme permet à la
                    Solidarité Olympique d’organiser des séminaires thématiques
                    pour les CNO, ainsi que pour certains secteurs fonctionnels au
                    sein des CNO. Les séminaires consacrés au marketing olympique,
                    instaurés par la commission de la Solidarité Olympique en
                    2015, sont reconduits dans le cadre de ce programme. De plus,
                    conformément à l’engagement du CIO de placer les athlètes au
                    cœur du Mouvement olympique, ce programme finance aussi des
                    forums biennaux pour les athlètes, en étroite collaboration avec
                    les associations continentales, les commissions des athlètes des
                    associations continentales et la commission des athlètes du CIO.
                    </AccordionBody>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionHeader targetId="17">Projets spéciaux </AccordionHeader>
                    <AccordionBody accordionId="17">
                    L’objectif de ce programme est de répondre aux besoins spéciaux
                    des CNO qui traversent des circonstances extraordinaires ou
                    imprévues. Ce fonds peut également être utilisé pour gérer d’autres
                    situations ou projets soumis par les CNO sortant du cadre des programmes généraux de la Solidarité Olympique. Les demandes sont
                    analysées en tenant compte de la situation du CNO, des subventions
                    spéciales reçues par le passé et de la gravité des circonstances.
                    </AccordionBody>
                  </AccordionItem>
                  </>)}
                </Accordion>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </section>
    </React.Fragment>
  );
}

export default BourseCategories;
