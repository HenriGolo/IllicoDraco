package illicodraco.project;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/Serv")
public class Serv extends HttpServlet {

  Facade facade;

  public Serv() {
    facade = new Facade();
  }

  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    /*try {
      String op = request.getParameter("op");

      switch (op) {
        case "ajoutp":
          String nom = request.getParameter("nom");
          String prenom = request.getParameter("prenom");

          facade.ajoutPersonne(nom, prenom);
          request.getRequestDispatcher("index.html").forward(request, response);
          return;

        case "ajouta":
          String rue = request.getParameter("rue");
          String ville = request.getParameter("ville");

          facade.ajoutAdresse(rue, ville);
          request.getRequestDispatcher("index.html").forward(request, response);
          return;

        case "choix":
          request.setAttribute("lp", facade.listePersonnes());
          request.setAttribute("la", facade.listeAdresses());

          request.getRequestDispatcher("choix.jsp").forward(request, response);
          return;

        case "associer":
          int ip = Integer.parseInt(request.getParameter("idp"));
          int ia = Integer.parseInt(request.getParameter("ida"));
          facade.associer(ip, ia);
          request.getRequestDispatcher("index.html").forward(request, response);
          return;

        case "lister":
          request.setAttribute("lp", facade.listePersonnes());
          request.setAttribute("la", facade.listeAdresses());

          request.getRequestDispatcher("lister.jsp").forward(request, response);
          return;

        default:
          request.getRequestDispatcher("index.html").forward(request, response);
          return;
      }


    } catch (Exception e) {
      response.getWriter().println("<html><body>ERREUR !</body></html>");
    }// */
  }

  @Override
  protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

  }
}
