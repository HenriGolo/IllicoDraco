package illicodraco.project.chat;

public class Message {
  private String from;
  private String content;
  private String to;

  public String getFrom() {
    return from;
  }

  public void setFrom(String from) {
    System.out.println("from <- " + from);
    this.from = from;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    System.out.println("content <- " + content);
    this.content = content;
  }

  public String getTo() {
    return to;
  }

  public void setTo(String to) {
    System.out.println("to <- " + to);
    this.to = to;
  }
}
