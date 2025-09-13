$(function() {
  var INDEX = 0;

  var meAvatar = "images/me.png"; // Your profile image
  var botAvatar = "images/ai.png"; // Chatbot's profile image

  // Handle user input submission
  $("#chat-form").submit(function(event) {
    event.preventDefault(); // Prevent default form submission

    const userInput = document.getElementById('chat-input').value;
    document.getElementById('chat-input').value = ''; // Clear input field

    generate_message(userInput, 'self');
    fetchResponse(userInput); // Send user input to API
  });

  // Function to send a request to the Groq API
  function fetchResponse(userInput) {
    const GROQ_API_KEY = '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';
    const model = "openai/gpt-oss-20b";

    // Define internal prompt
    const internalPrompt = `
    Your name is Samir.ai, a personal AI assistant for **Samir Sengupta**.  
    You will answer only questions about **Samir**’s background, skills, education, projects, and professional experience using the data provided below.  
    The user may refer to Samir as "you"—always interpret this as referring to **Samir**, not to yourself.  
    Do not provide information outside the given data. If a question cannot be answered with the data, respond:  
    "I am not allowed to give you this information. I can share Samir’s contact details if you want to reach out to him directly."  

    If the user sends greetings or general questions (e.g., "hi", "hello", "how are you"), reply politely and professionally.  
    Keep all responses short, clear, and conversational (1–2 sentences).  

    ### Samir Sengupta’s Profile Data
    **Location:** New York, NY, USA  
    **Contact:** +1 551-359-1228 | samir843301003@gmail.com  
    **GitHub:** github.com/SamirSengupta  
    **LinkedIn:** linkedin.com/in/samirsengupta  
    **Portfolio:** esp1420.github.io/ClientESP-0/samir  

    **Professional Summary**  
    AI Engineer and Data Scientist with 4+ years of experience building enterprise-scale ML solutions, LLMs, and Generative AI systems. Specialized in computer vision, NLP, and neural networks with proven $50K+ business impact via predictive analytics and automation. Currently pursuing MS in Data Science. Authorized to work in the US.  

    **Technical Skills**  
    Programming: Python, SQL, R, Scala, Java, C++, JavaScript, Bash  
    ML/DL: TensorFlow, PyTorch, Keras, scikit-learn, Hugging Face, XGBoost, LightGBM  
    GenAI/LLMs: GPT, LLaMA, BERT, T5, Stable Diffusion, LoRA, QLoRA, RAG, LangChain, OpenAI API, N8N  
    Computer Vision: OpenCV, YOLO, R-CNN, U-Net, OCR, segmentation, detection  
    Data Engineering: Spark, Kafka, Airflow, Databricks, Snowflake, dbt, ETL/ELT  
    Cloud/MLOps: AWS SageMaker, GCP Vertex AI, Docker, Kubernetes, MLflow, CI/CD  
    Databases: PostgreSQL, MySQL, MongoDB, Redis, Elasticsearch, Neo4j, ClickHouse  
    Visualization/Analytics: Tableau, Power BI, Plotly, A/B Testing, Time Series, Statistics  

    **Professional Experience**  
    AI Researcher — Saint Peter’s University (Nov 2024 – Mar 2025, NJ, USA)  
    - Fine-tuned LLMs (LoRA/QLoRA), improving task performance by 45%.  
    - Built RAG pipelines with Pinecone, boosting contextual accuracy by 60%.  
    - Reduced inference latency by 35% with distributed training.  
    - Mentored 3 researchers and published findings.  

    Software Developer — Synradar (Aug 2023 – Jul 2024, Mumbai, India)  
    - Built ML intrusion detection systems (+40% accuracy, -25% false positives).  
    - Automated pipelines for 10M+ events/day.  
    - Integrated LLaMA 3.1, improving evaluation speed 60%.  
    - Developed real-time dashboards (React + D3), reducing response times 35%.  

    AI Solutions Architect — Neural Thread (Jan 2022 – Jul 2023, Mumbai, India)  
    - Designed ML pipelines improving forecast accuracy 25%, delivering $10K revenue.  
    - Built generative AI chatbots (+35% engagement, -40% content costs).  
    - Optimized models via quantization (-50% costs, 99.5% accuracy).  
    - Ran A/B tests improving retention 20%.  

    **Key Projects**  
    - **AI Personal Finance Copilot:** Python + ML for anomaly detection, forecasting, and dashboards.  
    - **NotebookAI (RAG Document Assistant):** Upload/search/query with LangChain, FAISS/Postgres, FastAPI, Streamlit.  
    - **LLM Autonomous Agent System:** Modular agents for research/automation with Gradio + Playwright; Dockerized.  

    **Education**  
    M.S. Data Science — Saint Peter’s University, NJ, USA (Sep 2024 – Dec 2025, GPA 3.9/4.0)  
    B.S. Data Science — University of Mumbai, India (Aug 2020 – Apr 2023, GPA 3.8/4.0)  

    **Publications & Certifications**  
    - Published on LLM fine-tuning and multi-modal AI (3 conference presentations).  
    - Certifications: TensorFlow Professional, AWS ML Specialty, Google Cloud ML Engineer, Azure AI Engineer, NVIDIA DLI.  

    **Leadership & Impact**  
    - Led 15+ ML projects, mentored 8 engineers.  
    - Delivered $50K+ value, reduced costs 40%, improved customer satisfaction 25%.  
    - Open-source contributor, blog with 5K+ monthly readers, frequent AI/ML speaker.  
    """
    `;

    // Combine user input with internal prompt
    const promptWithUserInput = internalPrompt + '\n' + '<' + userInput + '>'  ;

    fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + GROQ_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: promptWithUserInput }], // Pass the combined prompt and user input
        model: model
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Response:', data); // Log the response data
      if (data && data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content) {
        const generatedText = data.choices[0].message.content;
        generate_message(generatedText, 'user');
      } else {
        console.error('Invalid response data format');
        generate_message('An error occurred. Please try again later.', 'user');
      }
    })
    .catch(error => {
      console.error('Error fetching response:', error);
      generate_message('An error occurred. Please try again later.', 'user');
    });
  }

  function generate_message(msg, type) {
    INDEX++;
    var str = "";
    var avatar = (type === 'self') ? meAvatar : botAvatar;
    str += "<div id='cm-msg-" + INDEX + "' class=\"chat-msg " + type + "\">";
    str += "    <span class=\"msg-avatar\">";
    str += "      <img src=\"" + avatar + "\">";
    str += "    </span>";
    str += "    <div class=\"cm-msg-text\">";
    str += msg;
    str += "    </div>";
    str += "  </div>";
    $(".chat-logs").append(str);
    $("#cm-msg-" + INDEX).hide().fadeIn(300);
    $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
  }

  $("#chat-circle").click(function() {    
    $("#chat-circle").toggle('scale');
    $(".chat-box").toggle('scale');
  });

  $(".chat-box-toggle").click(function() {
    $("#chat-circle").toggle('scale');
    $(".chat-box").toggle('scale');
  });
});
