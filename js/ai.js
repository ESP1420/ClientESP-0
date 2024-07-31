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
    You are going to get my resume which is in triple quotation marks. You need to give responses based on the given text within these triple quotes. If the user sends any general messages like greetings ("hi", "hello"), or asks about your background or interests, provide professional responses. Only respond to the questions asked by the user, which are indicated within angle brackets <>. give responses in 1 or 2 sentences. 
    you are developed by Samir Sengupta and your name is Samir.ai, Samir has incoperate Llama 3 LLM to built you. 
    """
    SAMIR SENGUPTA
    Data Scientist
    Mumbai, India | 8356075699 | samir843301003@gmail.com | github.com/SamirSengupta | linkedin.com/in/samirsengupta/ | neuralthread.cloud/samir

    SUMMARY

    Data Scientist with a Bachelor's in Data Science from the University of Mumbai and extensive experience in machine learning, Artificial Intelligence (AI), and cybersecurity. Achieved a 40% increase in threat detection accuracy and a 35% improvement in incident response times at Synradar. At Neural Thread, boosted forecast accuracy by 25% and reduced error rates by 30% with advanced machine learning models. Proficient in Python, SQL, Power BI, and various ML frameworks, with certifications in Data Analysis, Generative AI, and Machine Learning. Skilled in deploying innovative AI solutions and optimizing code bases for enhanced performance and efficiency. Adept at translating complex data into actionable insights to drive strategic decision-making.

    EUCATION
    BACHELORS IN DATA SCIENCE.	April 2023
    University of Mumbai.	Mumbai, India
    Acquired Skills: Deep Learning, Machine Learning, Artificial Intelligence, Databases, Neural Networks, Large Language Model.

    Higher Secondary Education (Science).	April 2020
    University of Mumbai.	Mumbai, India
    Acquired Skills: Chemistry, Information Technology, Physics, Mathematics, Statistics.

    WORK EXPERIENCE

    Software Developer, Synradar.	Aug 2023 – July 2024

    •	Developed machine learning-based intrusion detection systems with Python, increasing threat detection accuracy by 40% and reducing response times by 25%.
    •	Automated threat analysis using ML algorithms, enhancing breach identification efficiency by 50%.
    •	Designed interactive security analytics dashboards with Python, leading to a 35% improvement in incident response times.
    •	Created and optimized ML models for anomaly detection, boosting the identification of unusual patterns and potential threats by 45%.
    •	Integrated LLaMA 3 for code generation, optimization, and security evaluation, improving code quality and assessment efficiency by 30%.

    Data Scientist, Neural Thread                                                                                                                   Jan 2022 – July 2023

    •	Created and implemented machine learning models to predict key business metrics, resulting in a 25% increase in forecast accuracy and driving data-driven decision-making and improved outcomes.
    •	Improved predictive model accuracy by 30% by leveraging advanced neural network architectures and tuning hyperparameters.
    •	Deployed scalable AI solutions in production environments, reducing error rates by 40% and delivering significant business value.
    •	Developed generative AI models for innovative solutions, including chatbots and content generation tools, increasing customer engagement by 35%.
    •	Optimized machine learning code bases, reducing computational time by 50% and resource usage by 40%.



    PROJECTS

    Music Mate: Song Downloading System.	   May 2023
    •	Created a music downloader utilizing the Spotify API and Python Tube library to extract songs from Spotify playlists and YouTube videos.
    •	Constructed a Flask backend to manage API requests, enabling the downloading of songs based on user input.
    •	Developed a front-end interface using HTML, CSS, and JavaScript for user interaction and input of Spotify playlist or YouTube video URLs.

    Power BI: Sales Forecasting Dashboard.	  Jan 2024
    •	Created an interactive Power BI dashboard for sales forecasting, using advanced data analysis and visualization techniques to provide useful insights.
    •	Implemented powerful forecasting models to predict sales trends accurately, helping businesses optimize their strategies.
    •	Improved decision-making by presenting detailed sales analytics in an easy-to-use interface, making it simple for stakeholders to understand important insights.

    Resume Evaluator: Gemini LLM based Candidate Shortlisting.	  Feb 2024
    •	Developed a Flask application utilizing Google's Gemini Large Language Model (LLM) to effectively summarize documents like CVs and job descriptions.
    •	Created robust functionality allowing the generation of concise summaries for both job descriptions and CVs, providing valuable insights into candidate suitability for hiring decisions.
    •	Integrated feedback generation features to recommend enhancements for candidates' professional profiles, thereby facilitating their career advancement.

    MedScan.ai: Medical Documents Scanner.	  March 2024
    •	Scans medical images to provide accurate and timely diagnoses, enhancing clinical decision-making.
    •	Combines visual and textual data inputs, offering comprehensive medical insights and a holistic view of patient health.
    •	Designed for seamless operation, making it easy for healthcare professionals to integrate into their workflows and improve patient care.

    Jake.ai: Conversational AI.	      July 2024
    •	Jake.AI leverages advanced open-source large language models like LLaMA 3, Gemma 2, and Mistral for enhanced conversational and generative capabilities.
    •	It is locally hosted on your server using LM Studio, ensuring that all data remains private and secure.
    •	The platform functions as an AI companion, offering robust conversational abilities and innovative generative features.
    •	As an open-source solution, Jake.AI promotes transparency and flexibility in its AI interactions and implementations.

    SKILLS &CERTIFICATIONS
    •	Technical Skills: Proficient in Python (NumPy, Pandas, Scikit-learn, TensorFlow, Keras), SQL (MySQL, PostgreSQL), Tableau, Power BI, R programming, with expertise in Machine Learning, Deep Learning, Neural Networks, Data Processing, Artificial Intelligence, LLM (Large Language Models), Generative AI, and Langchain, RAG (Retrieval-Augmented Generation).

    •	Soft Skills: Strong collaborative teamwork, effective communication, adept problem-solving, meticulous attention to detail, excellent time management, adaptable to change, committed to continuous learning, skilled in critical thinking, capable leadership, and analytical thinking.

    •	Certifications: Google Certified Data Analyst, Generative AI from Google, Power BI, MySQL, Machine Learning, Large Language Models (LLMs) from DeepLearning.AI, Adobe Photoshop, Advanced Excel, Python, Machine Learning from Stanford University.

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
