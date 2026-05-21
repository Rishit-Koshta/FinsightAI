# 💰 FinsightAI

FinsightAI is an AI-powered financial assistant that helps users get intelligent answers to finance-related queries using **Retrieval-Augmented Generation (RAG)** and **Large Language Models (LLMs)**.

Built with **Spring Boot**, **vector embeddings**, and **local AI inference via LM Studio**, FinsightAI combines domain-specific knowledge retrieval with generative AI to provide accurate, context-aware financial responses.

---

## 🚀 Features

- 🤖 AI-powered financial Q&A assistant
- 🧠 Retrieval-Augmented Generation (RAG) pipeline
- 📚 Context-aware responses using document retrieval
- 🔍 Semantic search using embeddings
- 🏦 Finance domain knowledge integration
- 💬 REST API for AI interaction
- 🖥️ Local LLM support via LM Studio
- ⚡ Fast backend powered by Spring Boot
- 🔐 User-specific query handling
- 📦 Scalable architecture for future integrations

---

## 🛠 Tech Stack

### Backend
- Java 17
- Spring Boot
- Spring Web
- Spring Data JPA
- Lombok

### AI / RAG
- LM Studio
- BGE Small EN v1.5 Embedding Model
- Retrieval-Augmented Generation (RAG)
- Vector Search

### Database / Storage
- PostgreSQL / MySQL *(configure as needed)*

### Tools
- Maven
- Git
- Postman

---

## 🏗 Architecture

```text
User Query
   ↓
Spring Boot REST API
   ↓
Embedding Generation (BGE Small EN v1.5)
   ↓
Vector Similarity Search
   ↓
Relevant Financial Context Retrieval
   ↓
LLM (via LM Studio)
   ↓
AI Response
```

---

## 📂 Project Structure

```text
FinsightAI
├── src
│   └── main
│       ├── java
│       │   └── com
│       │       └── finsightai
│       │           ├── controller
│       │           │   └── AIController.java
│       │           ├── service
│       │           │   └── FinanceAIService.java
│       │           ├── dto
│       │           │   ├── AIRequest.java
│       │           │   └── AIResponse.java
│       │           ├── config
│       │           └── repository
│       │
│       └── resources
│           └── application.properties
│
└── pom.xml
```

---

## ⚙️ Setup & Installation

### Prerequisites

Make sure you have installed:

- Java 17+
- Maven
- PostgreSQL / MySQL
- LM Studio
- Git

---

### 1. Clone Repository

```bash
git clone https://github.com/Rishit-Koshta/FinsightAI.git
cd FinsightAI
```

---

### 2. Configure Database

Update `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/finsightai
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

---

### 3. Setup LM Studio

Install LM Studio and load the following models:

**Chat Model**
- Any chat-compatible LLM (e.g., Llama 3, Mistral)

**Embedding Model**
- `bge-small-en-v1.5`

Enable the local API server in LM Studio.

Example endpoint:

```text
http://localhost:1234/v1
```

---

### 4. Build Project

```bash
mvn clean install
```

---

### 5. Run Application

```bash
mvn spring-boot:run
```

Application starts at:

```text
http://localhost:8080
```

---

## 📡 API Usage

### Ask Financial Question

**Endpoint**

```http
POST /api/ai/ask
```

### Request Body

```json
{
  "userId": "user123",
  "question": "What are the benefits of SIP investment?"
}
```

### Sample Response

```json
{
  "answer": "A Systematic Investment Plan (SIP) allows regular investments in mutual funds, offering rupee cost averaging and disciplined investing."
}
```

---

## 💡 Example Use Cases

- Personal finance assistant
- Investment concept explanation
- Financial education chatbot
- Banking FAQ assistant
- Finance knowledge retrieval system
- AI-powered advisory prototype

---

## 🔮 Future Enhancements

- User authentication & authorization
- Chat history persistence
- Portfolio analysis support
- Multi-user support
- Financial document upload
- PDF ingestion for RAG
- Market news integration
- Real-time stock insights
- Docker containerization
- Cloud deployment (AWS / Azure / GCP)

---

## 🤝 Contributing

Contributions are welcome!

### Steps

1. Fork the repository

2. Create your feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Added new feature"
```

4. Push to GitHub

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

## 👨‍💻 Author

**Rishit Koshta**

GitHub: [https://github.com/Rishit-Koshta](https://github.com/Rishit-Koshta)

---

## 📄 License

This project is licensed under the MIT License.

---

## ⭐ Support

If you found this project useful, consider giving it a **star ⭐** on GitHub.
