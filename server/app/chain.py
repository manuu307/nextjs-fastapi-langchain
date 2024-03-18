from dotenv import load_dotenv
from langchain_community.vectorstores import DocArrayInMemorySearch
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnableParallel, RunnablePassthrough
from langchain_openai.chat_models import ChatOpenAI
from langchain_openai.embeddings import OpenAIEmbeddings

load_dotenv()

vectorstore = DocArrayInMemorySearch.from_texts(
    [
        "En Promptior, somos más que consultores, somos tus aliados para aprovechar el poder transformador de la IA. Creemos que la verdadera magia ocurre no solo a través de la implementación de la tecnología, sino cuando se adopta plenamente en cada rincón de tu organización. Nos comprometemos a fomentar un ecosistema donde la innovación no solo se aplica, sino que se integra sin problemas, convirtiéndose en una parte esencial de tus procesos diarios, decisiones estratégicas y marco operativo. Estamos aquí para guiarte en cada paso de este viaje transformador, asegurándonos de que no solo sea fluido, sino verdaderamente empoderador. Con Promptior a tu lado, estás dando un paso seguro hacia un futuro lleno de posibilidades sin precedentes.",
"Promptior fue fundada en marzo de 2023 con la misión de democratizar y facilitar el acceso a la Inteligencia Artificial para personas y organizaciones en todo el mundo. La adopción de estas tecnologías impulsa la innovación, mejora la eficiencia y transforma radicalmente la forma en que las personas trabajan, aprenden y colaboran.",
        """Promptior Innovation Studio
Bienvenido a Promptior Innovation Studio, donde transformamos tu visión en realidad. Trabajamos capacitando a la alta dirección y a los equipos de tu empresa en IA Generativa para liderar la transformación. Comprometemos y descubrimos oportunidades de crecimiento. Impulsamos la adopción mediante una hoja de ruta tecnológica. Acelera tus ideas con el Promptior Innovation Hub y destácate en tu industria.

Metodología Promptior
En el Promptior Innovation Hub, aceleramos las ideas hacia los resultados. A través de nuestra metodología de colaboración y creación conjunta, combinamos tecnología y estrategia empresarial para resolver desafíos, explorar oportunidades y desarrollar soluciones personalizadas. Trabajamos contigo y tus equipos, impulsando el crecimiento y la transformación mediante capacitaciones y talleres. Nuestro objetivo es ayudarte a innovar y destacarte en tu industria, brindándote el conocimiento y las herramientas necesarias para lograrlo.

Promptior Dev-Studio
¡Desarrolla tu éxito con Promptior Dev Studio! Nuestro equipo de expertos en desarrollo de software personalizado está listo para convertir tus ideas en soluciones digitales innovadoras. Desde el diseño hasta la implementación de automatizaciónes y la IA generativa, te brindamos un servicio completo que impulsa el crecimiento de tu empresa en el mundo digital. Un enfoque centrado en la experiencia de usuario, creamos productos robustos y escalables que te destacarán en tu industria.

Desarrolla soluciones digitales: Automatización y IA Generativa
En Promptior Dev Studio, no solo te ofrecemos un software a medida, sino también una asociación estratégica en el area de IA Generativa. Nuestro compromiso es llevar tu negocio al siguiente nivel con soluciones tecnológicas que marquen la diferencia. Aprovecha nuestra experiencia y conocimientos en desarrollo para superar los desafíos actuales y futuros. Confía en nosotros para impulsar tu éxito digital y alcanzar resultados extraordinarios. Juntos, construiremos un futuro brillante para tu empresa."""
     ],
    embedding=OpenAIEmbeddings(),
)
retriever = vectorstore.as_retriever()

template = """Responde solamente basandote en el siguiente context:
{context}

Consulta: {question}
"""
prompt = ChatPromptTemplate.from_template(template)
model = ChatOpenAI()
output_parser = StrOutputParser()

setup_and_retrieval = RunnableParallel(
    {"context": retriever, "question": RunnablePassthrough()}
)
chain = setup_and_retrieval | prompt | model | output_parser

