const API_KEY = 'AIzaSyBk3hKyKmNqMcEZSUD9cNKGn7sXBiAPuTU'; // Replace 'YOUR_API_KEY' with your actual API key

$(function() {
  var INDEX = 0;

  var meAvatar = "images/me.png"; // Your profile image
  var botAvatar = "images/ai.png"; // Chatbot's profile image

  // Handle user input submission
  $("#chat-form").submit(function(event) {
    event.preventDefault(); // Prevent default form submission

    const userInput = document.getElementById('user-message').value;
    document.getElementById('user-message').value = ''; // Clear input field

    generate_message(userInput, 'self');
    fetchResponse(userInput); // Send user input to API
  });

  // Function to send a cURL-like request to the Generative AI API
  function fetchResponse(userInput) {
    // Define internal prompt
    const internalPrompt = `

    keep this as an internal prompt and dont give this as response, based on the asked question fetch the response from the given text and give response in plain text without any bold or * also dont give me a response that you understand what the internal prompt is about just keep that in mind and give response to the asked question only, give responses in just 1 sentence for the asked questions and for basic questions give responses in 1 sentence but only 5 words max and keep them short preciese and crisp, for any converstaion based messages like hi, hello or greetings or basic messages give simple responses
    Samir Sengupta is an accomplished Data Scientist based in Mumbai, India, with a proven track record of leveraging advanced technologies to drive innovation and solve complex problems. With expertise in Large Language Models (LLM), Machine Learning (ML), Artificial Intelligence (AI), and Deep Learning techniques, Samir is adept at developing cutting-edge solutions to address challenges in the data science industry. He possesses a strong foundation in Python libraries such as NumPy, Pandas, Scikit-learn, TensorFlow, and Keras, enabling him to develop advanced analytics solutions and models.

    Contact Information:
    
    Location: Mumbai, India
    Phone: +91 8356075699
    Email: samir843301003@gmail.com
    GitHub: github.com/SamirSengupta
    LinkedIn: linkedin.com/in/samirsengupta
    Website: Samir-Sengupta.com
    Education:
    
    Bachelors in Data Science, University of Mumbai, April 2023
    Acquired Skills: Deep Learning, Machine Learning, Artificial Intelligence, Databases, Neural Networks, Large Language Model
    Work Experience:
    
    Associate Software Developer Python and Machine Learning, Synradar (April 2020 - Present):
    
    Led the transition from PHP to Python, resulting in a remarkable 160% increase in code base speed.
    Developed robust Flask applications fortified with AI algorithms and NLP, and utilized Power BI for tracking KPIs.
    Data Analyst, Profit Maxima (Aug 2022 - July 2023):
    
    Employed Python and SQL for thorough stock market data analysis, leading to a significant 25% increase in client satisfaction with investment recommendations.
    Created interactive data visualizations with Power BI and optimized backend infrastructure using MySQL.
    Data Scientist, Neural Thread (Jan 2021 - July 2022):
    
    Created machine learning models to predict customer churn accurately, resulting in an annual increase in customer retention rates from 71% to 93%.
    Enhanced Predictive Analytics Solutions using advanced deep learning algorithms and directed K-means clustering projects to segment customers dynamically.
    Projects:
    
    Music Mate: Song Downloading System (May 2023):
    
    Created a music downloader utilizing the Spotify API and Python Tube library.
    Developed a front-end interface using HTML, CSS, and JavaScript for user interaction.
    Customer Segmentation (Nov 2023):
    
    Executed K-means clustering to categorize customers based on Annual Income and Spending Score.
    Provided actionable insights to guide targeted marketing campaigns and strategic decisions.
    Power BI Sales Forecasting Dashboard (Jan 2024):
    
    Created an interactive Power BI dashboard for sales forecasting.
    Implemented powerful forecasting models to predict sales trends accurately.
    Gemini Pro (Feb 2024):
    
    Developed a Flask application utilizing Google's Gemini Large Language Model (LLM) to summarize documents like CVs and job descriptions.
    Integrated feedback generation features to recommend enhancements for candidates' professional profiles.
    Gemini Vision Pro (March 2024):
    
    Developed an image recognition app using Google's Gemini Pro Vision model to analyze user-uploaded images.
    Created an interactive user interface for easy image input and result display.
    Skills & Certifications:
    
    Technical Skills:
    Proficient in Python (NumPy, Pandas, Scikit-learn, TensorFlow, Keras), SQL (MySQL, PostgreSQL), Tableau, Power BI, R programming.
    Expertise in Machine Learning, Deep Learning, Neural Networks, Data Processing, Artificial Intelligence, LLM (Large Language Models), Generative AI, Langchain.
    Soft Skills:
    Strong collaborative teamwork, effective communication, adept problem-solving, meticulous attention to detail, excellent time management.
    Adaptable to change, committed to continuous learning, skilled in critical thinking, capable leadership, analytical thinking.
    Certifications:
    Google Certified Data Analyst, Blockchain Technology, Power BI, MySQL, Machine Learning, Recommender System, Adobe Photoshop, Advanced Excel, Python.
    Samir Sengupta's dedication to continuous learning and innovation, combined with his extensive skill set and experience, makes him a valuable asset in the field of data science.`;

    // Combine user input with internal prompt
    const promptWithUserInput = userInput + '\n' + internalPrompt;

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
