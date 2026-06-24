# 🚀 MidBlogApp - Katmanlı Mimari ile Geliştirilmiş Blog Yönetim Sistemi

MidBlogApp; backend tarafında kurumsal yazılım geliştirme prensiplerine uygun olarak **C# ve .NET Core** mimarisiyle, veri tabanı katmanında ise ilişkisel veri modelleriyle inşa edilmiş modern bir Blog Yönetim Sistemi uygulamasıdır. Proje, sürdürülebilir ve ölçeklenebilir bir kod tabanı sağlamak amacıyla **Katmanlı Mimari (N-Tier Architecture)** ve **Clean Code** prensipleri göz önünde bulundurularak geliştirilmiştir.

---

## 🛠️ Kullanılan Teknolojiler ve Mimari Yapı

*   **Framework & Dil:** .NET Core / C#
*   **Veri Tabanı & ORM:** PostgreSQL / MSSQL & Entity Framework Core (Code-First)
*   **Mimari Tasarım:** Katmanlı Yazılım Mimarisi (N-Tier Architecture)
*   **Tasarım Desenleri:** Repository Pattern, Dependency Injection (DI)
*   **Güvenlik & Doğrulama:** Fluent Validation / Identity Yönetimi Temelleri

---

## 🏗️ Proje Katmanları ve Klasör Yapısı

Sistem, sorumlulukların net bir şekilde ayrılması (Separation of Concerns) ilkesine dayanarak aşağıdaki katmanlardan oluşmaktadır:

1.  **Core / Domain Katmanı:** Projenin iş mantığının kalbidir. Veri tabanı tablolarının (Entities) ve ilişkilerinin (Bire çok, çoğa çok) tanımlandığı soyut katmandır.
2.  **DataAccess / Infrastructure Katmanı:** Entity Framework Core kullanılarak veri tabanı bağlantılarının, context yapısının ve veri tabanı göçlerinin (Migrations) yönetildiği katmandır. `PostgreSQL/MSSQL` entegrasyonu burada gerçekleştirilir.
3.  **Business / Service Katmanı:** Sistemdeki iş kurallarının (Business Rules) ve Fluent Validation doğrulamalarının işletildiği, DataAccess ile sunum katmanı arasında köprü görevi gören katmandır.
4.  **Presentation / Web Katmanı:** Kullanıcı arayüzünün veya API servislerinin yer aldığı, son kullanıcının sistemle etkileşime girdiği katmandır.

---

## 🔥 Öne Çıkan Özellikler & Veri Tabanı İlişkileri

*   **Gelişmiş İlişkisel Model:** Yazarlar (Authors), Kategoriler (Categories), Blog Yazıları (Posts) ve Yorumlar (Comments) arasında güçlü `One-to-Many` ve `Many-to-Many` ilişkisel veri tabanı tasarımı.
*   **Code-First Yaklaşımı:** Tüm veri tabanı tablolarının C# sınıfları üzerinden yönetilmesi ve Entity Framework Migrations ile versiyonlanması.
*   **Güvenli Veri Erişimi:** SQL Injection ve benzeri temel web açıklarına karşı korumalı, LINQ sorguları ile optimize edilmiş veri tabanı operasyonları.

---

## 💻 Projeyi Yerelde Çalıştırma

### Gereksinimler
*   .NET SDK (8.0 veya güncel sürüm)
*   PostgreSQL veya MSSQL Server
*   Visual Studio 2022 / VS Code

### Kurulum Adımları
1. Projeyi bilgisayarınıza klonlayın:
```bash
   git clone [https://github.com/Mislamdemir44/MidBlogApp.git](https://github.com/Mislamdemir44/MidBlogApp.git)

   Proje dizinine gidin:

Bash
   cd MidBlogApp/project
appsettings.json dosyasındaki Connection String alanını kendi yerel veri tabanı bilgilerinizle güncelleyin.

Veri tabanı tablolarını oluşturmak için Migration komutunu çalıştırın:

Bash
   dotnet ef database update
Projeyi ayağa kaldırın:

Bash
   dotnet run --project PresentationLayer
   
📬 İletişime Geçin
Proje hakkında soru, öneri veya iş birliği talepleriniz için bana aşağıdaki kanallardan ulaşabilirsiniz:

LinkedIn: Muhammet İslam Demir

E-posta: m.islamdemir44@gmail.com
