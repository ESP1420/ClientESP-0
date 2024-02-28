$(function() {
  var INDEX = 0;
  var questions = [
    "What is your educational background?",
    "Could you tell me about your work experience as a Data Analyst?",
    "What projects have you worked on?",
    "How did you contribute to your previous company as an Associate Software Developer?",
    "What certifications do you hold?",
    "What technical skills do you possess?",
    "Can you describe your soft skills?",
    "How did you optimize backend infrastructure at Profit Maxima?",
    "What was your role as a Data Scientist at Neural Thread?",
    "Could you explain your role in the creation of the Movie Recommendation System?"
  ];

  var meAvatar = "images/me.png"; // Your profile image
  var botAvatar = "images/ai.png"; // Chatbot's profile image

  $("#question-dropdown").change(function() {
    var selectedQuestionIndex = $(this).val();
    var question = questions[selectedQuestionIndex];
    generate_message(question, 'self');
    var response = getResponse(selectedQuestionIndex);
    setTimeout(function() {
      generate_message(response, 'user');
    }, 1000);
  });

  function getResponse(index) {
    var responses = [
      "I completed my Bachelor of Technology (Honors) in Data Science from KES Shroff College of Information Technology in March 2023 and Higher Secondary Education in Science from Reena Mehta College of Science in July 2020.",
      "Sure! I have experience as a Data Analyst & Backend Developer at Profit Maxima from August 2022 to July 2023, where I conducted data analysis on stock market data using Python and SQL, leading to a 25% increase in client satisfaction with investment recommendations.",
      "Some of the projects I've worked on include a Movie Recommendation System, a Music Mate song downloading system, a professional portfolio, a laptop price prediction application, and customer segmentation using K-means clustering.",
      "In my role as an Associate Software Developer at Amigosec Synradar, I spearheaded the migration of the entire code base from PHP to Python, resulting in a remarkable 160% increase in overall system speed and performance.",
      "I hold certifications in Blockchain Technology, Power BI, MySQL, Machine Learning, Recommender System, Adobe Photoshop, Advanced Excel, and Python.",
      "My technical skills include Python, SQL, Tableau, Power BI, R programming, machine learning, deep learning, data processing, and HTML/CSS/JS.",
      "My soft skills include collaborative teamwork, communication, problem-solving, attention to detail, time management, adaptability, continuous learning, critical thinking, leadership, and analytical thinking.",
      "At Profit Maxima, I optimized backend infrastructure with MySQL, resulting in a 40% decrease in data retrieval time and improved operational efficiency.",
      "As a Data Scientist at Neural Thread, I engineered a GPT-2 based prompt processing engine and introduced exclusive features for advanced users, offering specialized tools to achieve flawless image generation results.",
      "Certainly! For the Movie Recommendation System, I created it using the TMDB API with content-based filtering and deployed it on a Streamlit server for user interaction and visualization."
    ];
    return responses[index];
  }

  function generate_message(msg, type) {
    INDEX++;
    var str="";
    var avatar = (type === 'self') ? meAvatar : botAvatar;
    str += "<div id='cm-msg-"+INDEX+"' class=\"chat-msg "+type+"\">";
    str += "          <span class=\"msg-avatar\">";
    str += "            <img src=\"" + avatar + "\">";
    str += "          <\/span>";
    str += "          <div class=\"cm-msg-text\">";
    str += msg;
    str += "          <\/div>";
    str += "        <\/div>";
    $(".chat-logs").append(str);
    $("#cm-msg-"+INDEX).hide().fadeIn(300);
    $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);    
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
