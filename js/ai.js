const API_KEY = 'AIzaSyBk3hKyKmNqMcEZSUD9cNKGn7sXBiAPuTU'; // Replace 'YOUR_API_KEY' with your actual API key

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

  // Function to send a cURL-like request to the Generative AI API
  function fetchResponse(userInput) {
    // Define internal prompt
    const internalPrompt = `
    You are going to get my resume which is in triple quotation marks. You need to give responses based on the given text within these triple quotes. If the user sends any general messages like greetings ("hi", "hello"), or asks about your background or interests, provide normal responses. Only respond to the questions asked by the user, which are indicated within angle brackets <>. give responses in 1 or 2 sentences. 

    """
    SAMIR SENGUPTA 
    Data Scientist 
    Mumbai, India | 8356075699 | samir843301003@gmail.com | github.com/SamirSengupta | linkedin.com/in/samirsengupta | Samir-Sengupta.com
    SUMMARY 
    Experienced Data Scientist proficient in Large Language Models (LLM), Machine Learning (ML), Artificial Intelligence (AI), and 
    Deep Learning techniques. Skilled in Python libraries such as NumPy, Pandas, Scikit-learn, TensorFlow, and Keras, with expertise in 
    advanced analytics and model development. Possesses a strong foundation in SQL databases, Tableau, and Power BI for effective data 
    visualization and analysis. Capable of implementing cutting-edge algorithms and models to efficiently address complex challenges in 
    the data science industry. Dedicated to leveraging AI, LLM, Lang Chain and data visualization skills to drive Innovation and 
    continuous improvement in solving real-world problems. 
    EDUCATION 
    BACHELORS IN DATA SCIENCE. April 2023 
    University of Mumbai. Mumbai, India 
    Acquired Skills: Deep Learning, Machine Learning, Artificial Intelligence, Databases, Neural Networks, Large Language Model. 
    Higher Secondary Education (Science). April 2020 
    University of Mumbai. Mumbai, India 
    Acquired Skills: Chemistry, Information Technology, Physics, Mathematics, Statistics. 
    WORK EXPERIENCE 
    Associate Software Developer Python and Machine Learning, Synradar. Aug 2023 – Present 
    • Led the transition from PHP to Python, harnessing advanced AI, NLP, and local large language models, resulting in a 
    remarkable 160% increase in code base speed. 
    • Developed a robust Flask application fortified with AI algorithms and NLP to bolster security measures. 
    • Utilized Power BI to track KPIs, complemented by AI analytics. 
    Data Analyst, Profit Maxima. Aug 2022 – July 2023 
    • Employed Python and SQL for thorough stock market data analysis, resulting in a significant 25% increase in client 
    satisfaction with investment recommendations. 
    • Created interactive data visualizations with Power BI, improving client understanding of investment options and reducing 
    response time by 20% for client queries. 
    • Optimized backend infrastructure using MySQL, leading to a notable 40% decrease in data retrieval time and enhancing 
    operational efficiency. 
    Data Scientist, Neural Thread. Jan 2021 – July 2022 
    • Created machine learning models to predict customer churn accurately, resulting in an annual increase in customer retention 
    rates from 71% to 93%. 
    • Enhanced Predictive Analytics Solutions using advanced deep learning algorithms, leading to a significant 42% improvement 
    in prediction accuracy. 
    • Directed K-means clustering projects to segment customers dynamically, effectively optimizing targeted marketing strategies. 
    PROJECTS 
    Music Mate: Song Downloading System. May 2023 
    • Created a music downloader utilizing the Spotify API and Python Tube library to extract songs from Spotify playlists and 
    YouTube videos. 
    • Constructed a Flask backend to manage API requests, enabling the downloading of songs based on user input. 
    • Developed a front-end interface using HTML, CSS, and JavaScript for user interaction and input of Spotify playlist or 
    YouTube video URLs. 
    Customer Segmentation. Nov 2023 
    • Executed K-means clustering to categorize customers according to their Annual Income and Spending Score, revealing 
    insights into consumer behavior. 
    • Employed visualizations to illustrate clustering outcomes effectively, identifying 5 distinct customer segments with unique 
    characteristics. 
    • Provided actionable insights customized to guide targeted marketing campaigns and strategic business decisions, leveraging 
    the nuanced understanding derived from customer segmentation analysis. 
    Power BI Sales Forecasting Dashboard. Jan 2024 
    • Created an interactive Power BI dashboard for sales forecasting, using advanced data analysis and visualization techniques to 
    provide useful insights. 
    • Implemented powerful forecasting models to predict sales trends accurately, helping businesses optimize their strategies. 
    • Improved decision-making by presenting detailed sales analytics in an easy-to-use interface, making it simple for 
    stakeholders to understand important insights. 
    Gemini Pro. Feb 2024 
    • Developed a Flask application utilizing Google's Gemini Large Language Model (LLM) to effectively summarize documents 
    like CVs and job descriptions. 
    • Created robust functionality allowing the generation of concise summaries for both job descriptions and CVs, providing 
    valuable insights into candidate suitability for hiring decisions. 
    • Integrated feedback generation features to recommend enhancements for candidates' professional profiles, thereby facilitating 
    their career advancement. 
    Gemini Vision Pro. March 2024 
    • Developed an image recognition app using Google's Gemini Pro Vision model to analyze user-uploaded images. 
    • Incorporated advanced features to interpret images and provide descriptive prompts, assisting users in creating similar 
    imagery. 
    • Integrated the Gemini Provision model to accurately discern image content, ensuring precise responses. 
    • Created an interactive user interface for easy image input and result display, enhancing user experience and engagement. 
    SKILLS & CERTIFICATIONS
    • Technical Skills: Proficient in Python (NumPy, Pandas, Scikit-learn, TensorFlow, Keras), SQL (MySQL, PostgreSQL), 
    Tableau, Power BI, R programming, with expertise in Machine Learning, Deep Learning, Neural Networks, Data Processing, 
    Artificial Intelligence, LLM (Large Language Models), Generative AI, and Langchain. 
    • Soft Skills: Strong collaborative teamwork, effective communication, adept problem-solving, meticulous attention to detail, 
    excellent time management, adaptable to change, committed to continuous learning, skilled in critical thinking, capable 
    leadership, and analytical thinking. 
    • Certifications: Google Certified Data Analyst, Blockchain Technology, Power BI, MySQL, Machine Learning, Recommender 
    System, Adobe Photoshop, Advanced Excel, Python. 

    
    `;

    // Combine user input with internal prompt
    const promptWithUserInput = internalPrompt + '\n' + '<' + userInput + '>' ;

    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + API_KEY;
    const requestData = {
      contents: [{
        parts: [{
          text: promptWithUserInput
        }]
      }]
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Response:', data); // Log the response data
      if (data && data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0 && data.candidates[0].content.parts[0].text) {
        const generatedText = data.candidates[0].content.parts[0].text;
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
