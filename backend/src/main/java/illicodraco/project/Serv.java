package illicodraco.project;

import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/Serv")
public class Serv extends HttpServlet {
 
    Facade f;

    public Serv(){
        f = new Facade();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            String op = request.getParameter("op");

            switch (op) {
                case "ajoutp":
                    String nom = request.getParameter("nom");
                    String prenom = request.getParameter("prenom");

                    f.ajoutPersonne(nom, prenom);
                    request.getRequestDispatcher("index.html").forward(request, response);
                    return;

                case "ajouta":
                    String rue = request.getParameter("rue");
                    String ville = request.getParameter("ville");

                    f.ajoutAdresse(rue, ville);
                    request.getRequestDispatcher("index.html").forward(request, response);
                    return;
                
                case "choix":
                    request.setAttribute("lp", f.listePersonnes());
                    request.setAttribute("la", f.listeAdresses());
                    
                    request.getRequestDispatcher("choix.jsp").forward(request, response);
                    return;

                case "associer":
                    int ip = Integer.parseInt(request.getParameter("idp"));
                    int ia = Integer.parseInt(request.getParameter("ida"));
                    f.associer(ip, ia);
                    request.getRequestDispatcher("index.html").forward(request, response);
                    return;

                case "lister":
                    request.setAttribute("lp", f.listePersonnes());
                    request.setAttribute("la", f.listeAdresses());
                
                    request.getRequestDispatcher("lister.jsp").forward(request, response);
                    return;
                    
                default:
                    request.getRequestDispatcher("index.html").forward(request, response);
                    return;
            }


        } catch (Exception e) {
            response.getWriter().println("<html><body>ERREUR !</body></html>");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}