package illicodraco.project.repositories;

import illicodraco.project.beans.Outil;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

// Interface java gérant le repository des Outils
public interface OutilRepository extends JpaRepository<Outil, String> {

  Outil save(Outil outil);

  Optional<Outil> findById(String id);

  List<Outil> findAll();

  long count();

}
