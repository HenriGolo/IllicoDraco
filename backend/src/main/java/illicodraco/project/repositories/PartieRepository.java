package illicodraco.project.repositories;

import illicodraco.project.beans.Partie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

// Interface java gérant le repository des Parametres
public interface PartieRepository extends JpaRepository<Partie, String> {

  Partie save(Partie partie);

  Optional<Partie> findById(String id);

  List<Partie> findAll();

  long count();

}
