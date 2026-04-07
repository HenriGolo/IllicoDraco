package illicodraco.project.repositories;

import illicodraco.project.beans.Statistiques;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

// Interface java gérant le repository des Statistiques
public interface StatistiquesRepository extends JpaRepository<Statistiques, Integer> {

  Statistiques save(Statistiques stats);

  Optional<Statistiques> findById(Integer id);

  List<Statistiques> findAll();

  long count();

}
