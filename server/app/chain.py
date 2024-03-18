from langchain_community.llms import Ollama
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_openai.chat_models import ChatOpenAI
from langchain_openai.embeddings import OpenAIEmbeddings
from dotenv import load_dotenv
from langchain.chains.combine_documents import create_stuff_documents_chain

load_dotenv()

prompt = ChatPromptTemplate.from_template("""
user question: {input}

Answer the above, the length of the answer must be maximum one paragraph. use the following context:

<context>
    Promptior was founded in March 2023 with the mission to democratize and facilitate access to Artificial Intelligence for people and organizations worldwide. The adoption of these technologies drives innovation, improves efficiency, and radically transforms the way people work, learn, and collaborate.
    
    Training and capacitation
    We offer customized training designed for every level of your organization, from executives and directors to operational teams. This training enhances understanding of the impact that these technologies have on your industry, daily life, and organizational operations. Through this process, you will unlock the potential of these technologies in your projects, receiving a roadmap to guide key decisions and empower you to innovate ahead of the competition.
    
    Custom AI Solutions & Product Strategy
    As your partners in innovation, we align your business strategy with the potential that generative AI solutions have to offer. We offer flexibility to adapt to your evolving needs, whether that involves supervising projects as a trusted third party or providing turnkey development solutions. Our extensive expertise reduces implementation risks and accelerates AI initiatives, giving you a competitive edge. We provide the insights of a Chief Technical Officer and a Chief AI Officer as a service, delivering high-level expertise without the cost of a full-time hire. We serve as your guide, catalyzing adoption and leading your discovery journey to craft the perfect solution.
    
    Portfolio Assessment
    Generative AI technologies, such as ChatGPT, are set to revolutionize various industries. Our 'portfolio assessment' service conducts strategic analyses of your portfolio companies, identifying potential disruptions and opportunities. We provide a comprehensive assessment designed to guide them towards harnessing the power of AI. To stay ahead in the industry over the next three years and beyond, a well-defined and succinct generative AI strategy is crucial today, and we're here to help you develop it.
    
    AI Empowerment for Software Teams
    Elevate your software development teams with our training. Our approach is based on integrating AI tools and strategies to boost overall productivity and promote innovation within your organization. We provide training that goes beyond technical skills, aiming to optimize processes and increase operational efficiency throughout the development cycle. Enabling them to leverage existing AI tools to improve performance, drive competitive advantage, and transform opportunities into tangible business results.
</context>


""")

llm = ChatOpenAI(model="gpt-3.5-turbo-1106", temperature=0.5)

output_parser = StrOutputParser()

chain = prompt | llm | output_parser
