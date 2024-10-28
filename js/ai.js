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
    const model = "llama-3.1-8b-instant";

    // Define internal prompt
    const internalPrompt = `
    You are going to get my resume which is in triple quotation marks. You need to give responses based on the given text within these triple quotes. If the user sends any general messages like greetings ("hi", "hello"), or asks about your background or interests, provide professional responses. Only respond to the questions asked by the user, which are indicated within angle brackets <>. 
    you are developed by Samir Sengupta and your name is Samir.ai. 
    """
    SAMIR SENGUPTA 
    Data Scientist 
    New York, USA | 551-359-1228 | samir843301003@gmail.com | github.com/SamirSengupta | linkedin.com/in/samirsengupta/ | neuralthread.cloud/samir 
    SUMMARY 
    Data Scientist with a strong foundation in Deep Learning, Machine Learning, and Artificial Intelligence. Experienced in developing and 
    deploying scalable AI solutions, optimizing machine learning models, and integrating cutting-edge technologies like LLaMA for code 
    generation and security analysis. Proficient in computer vision, image manipulation, and deep learning algorithms. Proven track record in 
    improving business outcomes through data-driven decision-making, statistical analysis, data modelling and model development. Skilled in 
    data collection, data infrastructure, and the fine-tuning of models on unstructured data. Proficient in Python, TensorFlow, PyTorch, SQL, 
    and Power BI, with a commitment to continuous learning and professional growth. Currently pursuing a Master's in Data Science to further 
    enhance expertise in advanced data-driven methodologies. 
    EUCATION 
    MASTERS IN DATA SCIENCE.       
    Saint Peter’s University.  
    Sept 2024 
    New Jersey, USA 
    Acquired Skills: Deep Learning, Machine Learning, Artificial Intelligence, Databases, Neural Networks, Large Language Models, 
    Computer Vision, Data Modeling, Statistical Analysis. 
    BACHELORS IN DATA SCIENCE.      
    University of Mumbai.      
    April 2023 
    Mumbai, India 
    Acquired Skills: Python, SQL, Power BI, Tableau, Machine Learning, Deep Learning, Statistics, Predictive Models, Data Mining, Business 
    Intelligence. 
    WORK EXPERIENCE 
    Software Developer, Synradar. 
    Aug 2023 – July 2024 
    • Developed and optimized machine learning-based intrusion detection systems, improving threat detection accuracy by 40% and 
    reducing response times by 25%. 
    • Automated and enhanced threat analysis processes using machine learning algorithms, increasing efficiency by 50%. 
    • Integrated LLaMA 3.1 for code generation and security evaluation, resulting in a 30% improvement in code quality 
    and assessment efficiency.  
    • Designed and implemented interactive security analytics dashboards, leading to a 35% improvement in incident 
    response times. 
    Data Scientist, Neural Thread. 
    Jan 2022 – July 2023 
    • Developed and deployed machine learning models to predict key business metrics, increasing forecast accuracy by 25% 
    and driving data-driven decision-making. 
    • Enhanced predictive model performance by 30% through advanced neural network architectures and hyperparameter 
    tuning. 
    • Created generative AI models, such as chatbots and content generation tools, increasing customer engagement by 35%. 
    • Optimized AI solutions for production, reducing error rates by 40% and computational time by 50%, while delivering significant 
    business value.
    PROJECTS 
    May 2023 
    Music Mate: Song Downloading System. 
    • Created a music downloader utilizing the Spotify API and Python Tube library to extract songs from Spotify playlists and 
    YouTube videos. 
    • Constructed a Flask backend to manage API requests, enabling the downloading of songs based on user input. 
    • Developed a front-end interface for user interaction and input of Spotify playlist or YouTube video URLs. 
    Power BI: Sales Forecasting Dashboard. 
    Jan 2024 
    • Created an interactive Power BI dashboard for sales forecasting, using advanced data analysis and visualization techniques to 
    provide useful insights. 
    • Implemented powerful forecasting models to predict sales trends accurately, helping businesses optimize their strategies. 
    • Improved decision-making by presenting detailed sales analytics in an easy-to-use interface, making it simple for 
    stakeholders to understand important insights. 
    Resume Evaluator: Gemini LLM based Candidate Shortlisting. 
    Feb 2024 
    • Developed a Flask application utilizing Google's Gemini Large Language Model (LLM) to effectively summarize documents 
    like CVs and job descriptions. 
    • Created robust functionality allowing the generation of concise summaries for both job descriptions and CVs, providing 
    valuable insights into candidate suitability for hiring decisions. 
    • Integrated feedback generation features to recommend enhancements for candidates' professional profiles, thereby facilitating 
    their career advancement. 
    MedScan.ai: Medical Image Recognition. 
    • Scans medical images to provide accurate and timely diagnoses, enhancing clinical decision-making. 
    March 2024 
    • Combines visual and textual data inputs, offering comprehensive medical insights and a holistic view of patient health. 
    • Designed for seamless operation, making it easy for healthcare professionals to integrate into their workflows and improve 
    patient care. 
    • Applied computer vision and pattern recognition techniques for accurate image analysis. 
    Jake.ai: Conversational AI. 
    • Jake.AI leverages advanced open-source large language models LLMs like LLaMA 3, Gemma 2, and Mistral for 
    enhanced conversational and generative capabilities. 
    • It is locally hosted on your server using LM Studio, ensuring that all data remains private and secure. 
    • The platform functions as an AI companion, offering robust conversational abilities and innovative generative features. 
    • As an open-source solution, Jake.AI promotes transparency and flexibility in its AI interactions and implementations. 
    SKILLS &CERTIFICATIONS 
    July 2024 
    • Technical Skills: Python (NumPy, Pandas, Scikit-learn, TensorFlow, Keras, PyTorch), SQL (MySQL, PostgreSQL), ETL, 
    Tableau, Power BI, Machine Learning, Deep Learning, Neural Networks, Data Processing, Artificial Intelligence, LLM 
    (Large Language Models), Generative AI, DevOps, LangChain, RAG (Retrieval-Augmented Generation), API, Data 
    Analysis tools, Data Management, Cybersecurity, Natural Language Processing, Computer Vision, R Programming, Data 
    Engineering, Performance Optimization, Image Recognition, Data Infrastructure, Data Collection, Data Modeling, Statistical 
    Analysis, Fine-tuning Models, Product Development, Data Visualization, Transformers, Business Intelligence, Pattern 
    Recognition, Image Manipulation, Quantitative Research, BERT, KPIs. 
    • Soft Skills: Strong collaborative teamwork, effective communication, adept problem-solving, meticulous attention to detail, 
    excellent time management, adaptable to change, committed to continuous learning, skilled in critical thinking, capable 
    leadership, and analytical thinking, Decision Making. 
    • Certifications: Machine Learning from Stanford University, Generative AI from Google, Power BI, MySQL, Machine Learning, 
    Large Language Models (LLMs) from DeepLearning.AI, Advanced Excel (Microsoft Office), Python, Deep Learning. 
    
    Keep responses short and concise in 1 small sentence.
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
