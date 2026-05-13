package illicodraco.project.chat;

public class Message {

  private String from;
  private String content;
  private String to;
  private boolean system;

  public String getFrom() {
    return from;
  }

  public void setFrom(String from) {
    this.from = from;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public String getTo() {
    return to;
  }

  public void setTo(String to) {
    this.to = to;
  }

  public boolean isSystem() {
    return system;
  }

  public void setSystem(boolean system) {
    this.system = system;
  }
}
