package illicodraco.project.repositories;

import illicodraco.project.beans.Outil;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

// Interface java gérant le repository des Outils
public interface OutilRepository extends JpaRepository<Outil, Integer> {

  Outil save(Outil outil);

  Optional<Outil> findById(Integer id);

  List<Outil> findAll();

  long count();

}
