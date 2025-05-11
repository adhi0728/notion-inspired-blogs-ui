
import { Button } from "@/components/ui/button";

export const AboutPage = () => {
  return (
    <div className="container-custom py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="mb-4">About Blogify</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your source for insightful articles and engaging content
          </p>
        </div>
        
        <div className="space-y-12">
          {/* Our Mission */}
          <section>
            <h2 className="mb-4 text-2xl font-bold">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              At Blogify, we believe in the power of ideas and knowledge sharing. Our platform is designed to connect writers with readers who are passionate about discovering new perspectives and expanding their understanding of the world. We strive to create a community where thoughtful discourse and creative expression can thrive.
            </p>
          </section>

          {/* Our Story */}
          <section>
            <h2 className="mb-4 text-2xl font-bold">Our Story</h2>
            <p className="text-lg text-muted-foreground mb-4">
              Founded in 2023, Blogify began as a small project by a group of writers and developers who wanted to create a space where quality content could be shared without distractions. What started as a passion project has grown into a platform used by thousands of readers and writers around the world.
            </p>
            <p className="text-lg text-muted-foreground">
              Today, we continue to evolve and improve our platform based on the feedback and needs of our community. Our goal is to make writing and reading on the web a more rewarding experience for everyone.
            </p>
          </section>

          {/* Our Team */}
          <section>
            <h2 className="mb-6 text-2xl font-bold">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Alex Johnson",
                  role: "Founder & CEO",
                  bio: "Former tech journalist with a passion for storytelling and technology.",
                  avatar: "https://randomuser.me/api/portraits/men/32.jpg"
                },
                {
                  name: "Sophia Rodriguez",
                  role: "Head of Content",
                  bio: "Editor with over 10 years of experience in digital publishing.",
                  avatar: "https://randomuser.me/api/portraits/women/44.jpg"
                },
                {
                  name: "Marcus Lee",
                  role: "Lead Developer",
                  bio: "Full-stack developer focused on creating seamless user experiences.",
                  avatar: "https://randomuser.me/api/portraits/men/22.jpg"
                }
              ].map((member) => (
                <div key={member.name} className="flex flex-col items-center text-center p-4 rounded-lg border bg-card">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mb-4 object-cover"
                  />
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-muted-foreground font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Us */}
          <section className="bg-muted p-8 rounded-lg">
            <h2 className="mb-4 text-2xl font-bold text-center">Get In Touch</h2>
            <p className="text-center text-muted-foreground mb-6">
              Have questions or suggestions? We'd love to hear from you!
            </p>
            <div className="flex justify-center">
              <Button size="lg">Contact Us</Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
